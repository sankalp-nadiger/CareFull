import express from 'express';
import { registerVolunteer, getVolunteers } from '../controllers/volunteer.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import { userAuth } from '../middleware/auth.middleware.js';

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
{
  try {
    const { fitfullDoctorId, name, specialties, password } = req.body;

    // Check if volunteer already exists
    const existingVolunteer = await Volunteer.findOne({ fitfullDoctorId });
    if (existingVolunteer) {
      return res.status(400).json({ message: 'Volunteer with this Doctor ID already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new volunteer document
    const volunteer = new Volunteer({
      fitfullDoctorId,
      name,
      specialties,
      password: hashedPassword, // Store hashed password
      verified: false, // Default to unverified
    });

    // Save to database
    await volunteer.save();

    // Return success but don't include password in response
    const volunteerResponse = volunteer.toObject();
    delete volunteerResponse.password;
    
    res.status(201).json({ 
      message: 'Volunteer registered successfully', 
      volunteer: volunteerResponse 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Registration failed',
      details: error.message
    });
  }
}

// pages/api/volunteer/signin.js
import dbConnect from '../../../utils/dbConnect';
import Volunteer from '../../../models/Volunteer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect();

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
}