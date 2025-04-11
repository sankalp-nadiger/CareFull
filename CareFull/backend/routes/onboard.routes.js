import express from 'express';
import {
  getSuppliersForDropdown,
  getDrugsWithManufacturer,
  saveOnboardingSelection
} from '../controllers/onboarding.controller.js';
import { authenticatePharmacist } from '../middleware/auth.middleware.js';

const router = express.Router();

// Step 1: Get supplier list for dropdown
router.get('/suppliers', authenticatePharmacist, getSuppliersForDropdown);

// Step 2: Get list of drugs with manufacturers
router.get('/drugs', authenticatePharmacist, getDrugsWithManufacturer);

// Step 3: Save selected supplier and drug during onboarding
router.post('/save-selection', authenticatePharmacist, saveOnboardingSelection);

export default router;
