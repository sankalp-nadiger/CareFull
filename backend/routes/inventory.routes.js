import express from 'express';
import { 
    getLowStockDrugs, 
    reorderDrug,
    addMedicine,
    updateMedicineStock,
    getMedicines,
    getMedicineById,
    deleteMedicine,
    searchMedicines 
} from '../controllers/inventory.controller.js';
import { pharmacistAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/inventory/medicines:
 *   post:
 *     summary: Add a new medicine to inventory
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               manufacturer:
 *                 type: string
 *               category:
 *                 type: string
 *               prescriptionRequired:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Medicine added successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/medicines', pharmacistAuth, addMedicine);

/**
 * @swagger
 * /api/inventory/medicines/{medicineId}/stock:
 *   patch:
 *     summary: Update medicine stock
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: medicineId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stock
 *             properties:
 *               stock:
 *                 type: number
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Stock updated successfully
 */
router.patch('/medicines/:medicineId/stock', pharmacistAuth, updateMedicineStock);

/**
 * @swagger
 * /api/inventory/medicines:
 *   get:
 *     summary: Get all medicines
 *     tags: [Inventory]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: prescriptionRequired
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of medicines
 */
router.get('/medicines', getMedicines);

/**
 * @swagger
 * /api/inventory/medicines/search:
 *   get:
 *     summary: Search medicines
 *     tags: [Inventory]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 */
router.get('/medicines/search', searchMedicines);

/**
 * @swagger
 * /api/inventory/medicines/{medicineId}:
 *   get:
 *     summary: Get medicine by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: medicineId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Medicine details
 *       404:
 *         description: Medicine not found
 */
router.get('/medicines/:medicineId', getMedicineById);

/**
 * @swagger
 * /api/inventory/medicines/{medicineId}:
 *   delete:
 *     summary: Delete a medicine
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: medicineId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Medicine deleted successfully
 *       404:
 *         description: Medicine not found
 */
router.delete('/medicines/:medicineId', pharmacistAuth, deleteMedicine);

/**
 * @swagger
 * /api/inventory/low-stock/{pharmacyId}:
 *   get:
 *     summary: Get low stock medicines for a pharmacy
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pharmacyId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of low stock medicines
 */
router.get('/low-stock/:pharmacyId', pharmacistAuth, getLowStockDrugs);

/**
 * @swagger
 * /api/inventory/reorder:
 *   post:
 *     summary: Reorder medicines
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - medicineId
 *               - quantity
 *             properties:
 *               medicineId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Reorder placed successfully
 */
router.post('/reorder', pharmacistAuth, reorderDrug);

export default router;
