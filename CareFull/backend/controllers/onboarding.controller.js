// controllers/pharmacyController.js

import Pharmacy from '../models/Pharmacy.model.js';
import Drug from '../models/drug.model.js';

// Step 1: Get supplier list from the pharmacy model
export const getSuppliersForDropdown = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findById(req.user._id);
    if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });

    res.status(200).json(pharmacy.suppliers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch suppliers', details: err.message });
  }
};

// Step 2: Get drugs list with manufacturers
export const getDrugsWithManufacturer = async (req, res) => {
  try {
    const drugs = await Drug.find({}, 'name manufacturer');
    const formatted = drugs.map(d => ({
      name: d.name,
      manufacturer: d.manufacturer
    }));
    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drugs', details: err.message });
  }
};

// Step 3: Save selected supplier + drug into pharmacy
export const saveOnboardingSelection = async (req, res) => {
  const { supplierName, supplierEmail, drugName, manufacturer } = req.body;

  try {
    const pharmacy = await Pharmacy.findById(req.user._id);
    if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });

    const drug = await Drug.findOne({ name: drugName, manufacturer });
    if (!drug) return res.status(404).json({ error: 'Drug not found' });

    const existingSupplier = pharmacy.suppliers.find(s => s.email === supplierEmail);
    if (!existingSupplier) {
      pharmacy.suppliers.push({ name: supplierName, email: supplierEmail });
    }

    pharmacy.inventory.push({
      drug: drug._id,
      quantity: 10,
      lowStockThreshold: 5,
      supplierEmail
    });

    await pharmacy.save();

    res.status(200).json({ message: 'Onboarding data saved successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save onboarding data', details: err.message });
  }
};
