import express from "express";
import User from "../models/user.model.js";
import { userAuth } from "../middleware/auth.middleware.js";
const router = express.Router();

/**
 * @swagger
 * /api/auth/sync-users:
 *   get:
 *     summary: Synchronize users from external system
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Users synced successfully
 *       500:
 *         description: Failed to sync users
 */
router.get('/sync-users', async (req, res) => {
    try {
      await fetchAndStoreUsers();
      res.status(200).json({ message: 'Users synced successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to sync users' });
    }
  });
  /**
   * @swagger
   * /api/auth/send-otp:
   *   post:
   *     summary: Send OTP to user's mobile number
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - mobileNumber
   *             properties:
   *               mobileNumber:
   *                 type: string
   *                 description: User's mobile number
   *     responses:
   *       200:
   *         description: OTP sent successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Failed to send OTP
   */
  router.post('/send-otp', async (req, res) => {
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
    /**
   * @swagger
   * /api/auth/verify-otp:
   *   post:
   *     summary: Verify OTP and authenticate user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - mobileNumber
   *               - otp
   *             properties:
   *               mobileNumber:
   *                 type: string
   *                 description: User's mobile number
   *               otp:
   *                 type: string
   *                 description: The OTP received by user
   *     responses:
   *       200:
   *         description: OTP verified successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 token:
   *                   type: string
   *                 user:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     fullName:
   *                       type: string
   *                     email:
   *                       type: string
   *                     avatar:
   *                       type: string
   *       400:
   *         description: Invalid or expired OTP
   *       404:
   *         description: User not found
   *       500:
   *         description: Failed to verify OTP
   */
  router.post('/verify-otp', async (req, res) => {
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
    /**
   * @swagger
   * /api/auth/user:
   *   get:
   *     summary: Get current authenticated user's data
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: User data retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                 fullName:
   *                   type: string
   *                 email:
   *                   type: string
   *                 avatar:
   *                   type: string
   *                 mobileNumber:
   *                   type: string
   *                 role:
   *                   type: string
   *                   enum: [user, pharmacist, admin]
   *       401:
   *         description: Unauthorized - Invalid or missing token
   *       404:
   *         description: User not found
   *       500:
   *         description: Failed to get user data
   */
  router.get('/user', userAuth, async (req, res) => {
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
  

  export default router;