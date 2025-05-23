import express from 'express';
import { registerVolunteer, getVolunteers } from '../controllers/volunteer.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import { userAuth } from '../middleware/auth.middleware.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Volunteer from '../models/volunteer.model.js';

const router = express.Router();

/**
 * @swagger
 * /api/volunteers/register:
 *   post:
 *     summary: Register as a medical volunteer
 *     tags: [Volunteers]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - qualification
 *               - certificateImage
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               qualification:
 *                 type: string
 *               specialization:
 *                 type: string
 *               availability:
 *                 type: array
 *                 items:
 *                   type: string
 *               certificateImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Volunteer registered successfully
 *       400:
 *         description: Invalid input
 */
router.post('/register', upload.single('certificateImage'), registerVolunteer);

/**
 * @swagger
 * /api/volunteers:
 *   get:
 *     summary: Get list of available volunteers
 *     tags: [Volunteers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: specialization
 *         schema:
 *           type: string
 *       - in: query
 *         name: availability
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of volunteers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   qualification:
 *                     type: string
 *                   specialization:
 *                     type: string
 *                   availability:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.get('/', userAuth, getVolunteers);

// Volunteer sign in route
router.post('/signin', async (req, res) => {
  try {
    const { fitfullDoctorId, password } = req.body;

    // Find volunteer by Doctor ID
    const volunteer = await Volunteer.findOne({ fitfullDoctorId });
    if (!volunteer) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, volunteer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: volunteer._id, fitfullDoctorId: volunteer.fitfullDoctorId },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    // Return success with token
    res.status(200).json({
      message: 'Sign-in successful',
      token,
      volunteer: {
        id: volunteer._id,
        fitfullDoctorId: volunteer.fitfullDoctorId,
        name: volunteer.name,
        specialties: volunteer.specialties,
        verified: volunteer.verified,
        rating: volunteer.rating,
        points: volunteer.points
      }
    });
  } catch (error) {
    console.error('Sign-in error:', error);
    res.status(500).json({ 
      message: 'Sign-in failed',
      details: error.message
    });
  }
});

export default router;