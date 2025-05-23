import express from 'express';
import {
  getSuppliersForDropdown,
  getDrugsWithManufacturer,
  saveOnboardingSelection
} from '../controllers/onboarding.controller.js';
import { pharmacistAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Onboarding
 *   description: Pharmacy onboarding process APIs
 */

/**
 * @swagger
 * /api/onboarding/suppliers:
 *   get:
 *     summary: Get list of suppliers for pharmacy onboarding
 *     tags: [Onboarding]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of suppliers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *       500:
 *         description: Failed to fetch suppliers
 * */
router.get('/suppliers', getSuppliersForDropdown);

/**
 * @swagger
 * /api/onboarding/drugs:
 *   get:
 *     summary: Get list of drugs with their manufacturers
 *     tags: [Onboarding]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of drugs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   manufacturer:
 *                     type: string
 *                   category:
 *                     type: string
 *       500:
 *         description: Failed to fetch drugs
 */
router.get('/drugs', pharmacistAuth, getDrugsWithManufacturer);

/**
 * @swagger
 * /api/onboarding/save-selection:
 *   post:
 *     summary: Save pharmacy's selected suppliers and drugs during onboarding
 *     tags: [Onboarding]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pharmacyId
 *               - selections
 *             properties:
 *               pharmacyId:
 *                 type: string
 *                 description: ID of the pharmacy being onboarded
 *               selections:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - supplierId
 *                     - drugs
 *                   properties:
 *                     supplierId:
 *                       type: string
 *                       description: ID of the selected supplier
 *                     drugs:
 *                       type: array
 *                       items:
 *                         type: string
 *                         description: IDs of selected drugs for this supplier
 *     responses:
 *       200:
 *         description: Selections saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 pharmacy:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     suppliers:
 *                       type: array
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Pharmacy or supplier not found
 *       500:
 *         description: Failed to save selections
 */
router.post('/save-selection', pharmacistAuth, saveOnboardingSelection);

export default router;
