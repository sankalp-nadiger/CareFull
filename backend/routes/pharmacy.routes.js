import express from 'express';
import { registerPharmacist, loginPharmacist } from '../controllers/pharmacy.controller.js'

const router = express.Router();

/**
 * @swagger
 * /api/pharmacist/register:
 *   post:
 *     summary: Register a new pharmacy
 *     tags: [Pharmacy]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               location:
 *                 type: string
 *               suppliers:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Pharmacy registered successfully
 *       400:
 *         description: Invalid input or email already exists
 */
router.post('/register', registerPharmacist);

/**
 * @swagger
 * /api/pharmacist/login:
 *   post:
 *     summary: Login for pharmacy
 *     tags: [Pharmacy]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 pharmacist:
 *                   type: object
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginPharmacist);

export default router;