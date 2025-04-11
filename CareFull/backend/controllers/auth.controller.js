import { google } from 'googleapis';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';
import Pharmacy from '../models/Pharmacy.js';

const signupOAuthClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.SIGNUP_REDIRECT_URI
);

const loginOAuthClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.LOGIN_REDIRECT_URI
);

// Helper function to generate a random activity
const getRandomActivity = () => {
  const activities = ['Yoga', 'Walking', 'Cycling', 'Meditation'];
  return activities[Math.floor(Math.random() * activities.length)];
};

export const googleSignupCallback = async (req, res) => {
  const { code, role, proofs, credentials, fitfullUserId } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, message: "No authorization code provided" });
  }

  try {
    const { tokens } = await signupOAuthClient.getToken({ code, redirect_uri: signupOAuthClient.redirectUri });
    signupOAuthClient.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: signupOAuthClient });
    const { data: googleUser } = await oauth2.userinfo.get();

    let user = await User.findOne({ email: googleUser.email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exists. Please sign in instead."
      });
    }

    if (!role || (role !== 'pharmacy' && role !== 'volunteer')) {
      return res.status(400).json({
        success: false,
        message: "Invalid role provided. Must be either 'pharmacy' or 'volunteer'."
      });
    }

    if (!proofs || proofs.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Proof documents are required for registration."
      });
    }

    if (role === 'volunteer' && !fitfullUserId) {
      return res.status(400).json({
        success: false,
        message: "fitfullUserId is required for volunteer registration."
      });
    }

    user = new User({
      fitfullUserId: fitfullUserId || googleUser.id,
      fullName: `${googleUser.given_name} ${googleUser.family_name}`,
      email: googleUser.email,
      avatar: googleUser.picture,
      googleId: googleUser.id,
      authProvider: "google",
      role,
      proofs,
      credentials,
      username: googleUser.email.split('@')[0] + "_" + Math.floor(Math.random() * 10000),
      tokens: {
        googleFitToken: tokens.access_token,
        googleFitTokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
        refreshToken: tokens.refresh_token
      },
    });

    await user.save();

    const jwtToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    const activity = getRandomActivity();

    res.json({
      success: true,
      jwt: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        avatar: user.avatar,
        role: user.role,
        suggestedActivity: activity
      }
    });
  } catch (error) {
    console.error("Google OAuth Signup Error:", error);
    res.status(500).json({ success: false, message: "Google authentication failed", error: error.message });
  }
};

export const googleLoginCallback = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, message: "No authorization code provided" });
  }

  try {
    const { tokens } = await loginOAuthClient.getToken({ code, redirect_uri: loginOAuthClient.redirectUri });
    loginOAuthClient.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: loginOAuthClient });
    const { data: googleUser } = await oauth2.userinfo.get();

    let user = await User.findOne({ email: googleUser.email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist. Please sign up first." });
    }

    user.tokens.googleFitToken = tokens.access_token;
    if (tokens.expiry_date) {
      user.tokens.googleFitTokenExpiry = new Date(tokens.expiry_date);
    }
    if (tokens.refresh_token) {
      user.tokens.refreshToken = tokens.refresh_token;
    }

    await user.save();

    const jwtToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    const activity = getRandomActivity();

    res.json({ success: true, jwt: jwtToken, user, suggestedActivity: activity });
  } catch (error) {
    console.error("Google OAuth Login Error:", error);
    res.status(500).json({ success: false, message: "Google authentication failed", error: error.message });
  }
};

// Pharmacist Registration and Login




