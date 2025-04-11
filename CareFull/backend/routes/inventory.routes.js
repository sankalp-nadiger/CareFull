import express from 'express';
// import { getLowStockDrugs, reorderDrug } from '../controllers/pharmacyController.js';
// import { authenticatePharmacist } from '../middleware/auth.middleware.js'; // Assuming role-based auth
import { getLowStockDrugs,reorderDrug } from '../controllers/inventory.controller.js';
const router = express.Router();

// GET low stock drugs for a pharmacy
router.get('/low-stock/:pharmacyId',  getLowStockDrugs);

// POST reorder drug
router.post('/reorder', reorderDrug);

export default router;
