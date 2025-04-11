

import Pharmacy from '../models/Pharmacy.model.js';
// import Drug from '../models/Drug.js';
// import sendLowStockEmail from '../utils/email.js';

// Get all low stock drugs for a pharmacy
export const getLowStockDrugs = async (req, res) => {
  const { pharmacyId } = req.params;

  try {
    const pharmacy = await Pharmacy.findById(pharmacyId).populate('inventory.drug');
    if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });

    const lowStockItems = pharmacy.inventory
      .filter(item => item.quantity < item.lowStockThreshold)
      .map(item => ({
        drugId: item.drug._id,
        name: item.drug.name,
        quantity: item.quantity,
        manufacturer: item.drug.manufacturer,
        supplierEmail: item.supplierEmail
      }));

    res.status(200).json({
      lowStockItems,
      suppliers: pharmacy.suppliers
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch low stock items', details: err.message });
  }
};

// Reorder drug after pharmacist clicks "OK"
export const reorderDrug = async (req, res) => {
  const { pharmacyId, drugId, quantityToAdd } = req.body;

  try {
    const pharmacy = await Pharmacy.findById(pharmacyId).populate('inventory.drug');
    if (!pharmacy) return res.status(404).json({ error: 'Pharmacy not found' });

    const item = pharmacy.inventory.find(i => i.drug._id.toString() === drugId);
    if (!item) return res.status(404).json({ error: 'Drug not found in inventory.' });

    const supplierEmail = item.supplierEmail;
    const drugName = item.drug.name;

    // Send email to supplier
    await sendLowStockEmail({
      to: supplierEmail,
      drugName,
      quantity: quantityToAdd
    });

    // Update inventory
    item.quantity += quantityToAdd;
    await pharmacy.save();

    res.status(200).json({ message: `Order placed with ${supplierEmail} and inventory updated.` });
  } catch (err) {
    res.status(500).json({ error: 'Reorder failed', details: err.message });
  }
};
