import express from 'express';
import { registerPharmacist, loginPharmacist } from '../controllers/pharmacy.controller.js'

const router = express.Router();

// POST /api/pharmacist/register
router.post('/register', registerPharmacist);

// POST /api/pharmacist/login
router.post('/login', loginPharmacist);

export default router;