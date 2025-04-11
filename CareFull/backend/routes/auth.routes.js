import express from "express";
import User from "../models/user.model.js";
import { user_verifyJWT} from "../middlewares/auth.middleware.js";
const router = express.Router();
router.get('/api/sync-users', async (req, res) => {
    try {
      await fetchAndStoreUsers();
      res.status(200).json({ message: 'Users synced successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to sync users' });
    }
  });
  router.post('http://localhost:8000/api/auth/send-otp', async (req, res) => {
    try {
      const { mobileNumber } = req.body;
      
      // Find user by mobile number
      const user = await User.findOne({ mobileNumber });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiry = new Date();
      otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); // OTP valid for 10 minutes
      
      // Save OTP to user document
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
      
      // Send OTP via Twilio
      await twilioClient.messages.create({
        body: `Your FitFull verification code is: ${otp}. Valid for 10 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: mobileNumber
      });
      
      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error('Error sending OTP:', error);
      res.status(500).json({ error: 'Failed to send OTP' });
    }
  });
  
  // Verify OTP
  router.post('http://localhost:8000/api/auth/verify-otp', async (req, res) => {
    try {
      const { mobileNumber, otp } = req.body;
      
      // Find user by mobile number
      const user = await User.findOne({ mobileNumber });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Check if OTP is valid and not expired
      const now = new Date();
      if (user.otp !== otp || now > user.otpExpiry) {
        return res.status(400).json({ error: 'Invalid or expired OTP' });
      }
      
      // Mark user as verified
      user.isVerified = true;
      user.otp = null;
      user.otpExpiry = null;
      await user.save();
      
      // Generate JWT token for authentication
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      
      res.status(200).json({ 
        message: 'OTP verified successfully',
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          avatar: user.avatar
        }
      });
    } catch (error) {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ error: 'Failed to verify OTP' });
    }
  });
  
  // Get current user data
  router.get('/api/auth/user', authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.userId).select('-otp -otpExpiry -password');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get user data' });
    }
  });
  
  // JWT Authentication middleware
  import jwt from 'jsonwebtoken';
  
  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
      }
      
      req.userId = decoded.userId;
      next();
    });
  }  

  export default router;