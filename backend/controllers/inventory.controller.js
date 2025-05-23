import Pharmacy from '../models/Pharmacy.model.js';
import Drug from '../models/drug.model.js';
import sendLowStockEmail from '../utils/email.js';

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

// Add a new medicine to inventory
export const addMedicine = async (req, res) => {
  try {
    const { 
      name, 
      description, 
      price, 
      stock, 
      manufacturer, 
      category, 
      prescriptionRequired,
      dosage 
    } = req.body;
    
    // Validate required fields
    if (!name || !price || stock === undefined) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        required: ['name', 'price', 'stock'] 
      });
    }

    // Validate price and stock are positive numbers
    if (price < 0 || stock < 0) {
      return res.status(400).json({ 
        error: 'Price and stock must be positive numbers' 
      });
    }

    const medicine = new Drug({
      name,
      description,
      price,
      stock,
      manufacturer,
      category,
      prescriptionRequired,
      dosage
    });

    await medicine.save();

    res.status(201).json({
      message: 'Medicine added successfully',
      medicine
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add medicine', details: err.message });
  }
};

// Update medicine stock and price
export const updateMedicineStock = async (req, res) => {
  try {
    const { medicineId } = req.params;
    const { stock, price } = req.body;

    const medicine = await Drug.findById(medicineId);
    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    // Validate stock and price are positive if provided
    if (stock !== undefined && stock < 0) {
      return res.status(400).json({ error: 'Stock must be a positive number' });
    }
    if (price !== undefined && price < 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }

    if (stock !== undefined) medicine.stock = stock;
    if (price !== undefined) medicine.price = price;

    await medicine.save();

    res.status(200).json({
      message: 'Medicine updated successfully',
      medicine
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update medicine', details: err.message });
  }
};

// Get all medicines with optional filters
export const getMedicines = async (req, res) => {
  try {
    const { category, prescriptionRequired } = req.query;
    let query = {};

    if (category) query.category = category;
    if (prescriptionRequired !== undefined) {
      query.prescriptionRequired = prescriptionRequired === 'true';
    }

    const medicines = await Drug.find(query);
    res.status(200).json(medicines);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch medicines', details: err.message });
  }
};

// Get medicine by ID
export const getMedicineById = async (req, res) => {
  try {
    const { medicineId } = req.params;
    const medicine = await Drug.findById(medicineId);

    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    res.status(200).json(medicine);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch medicine', details: err.message });
  }
};

// Delete a medicine
export const deleteMedicine = async (req, res) => {
  try {
    const { medicineId } = req.params;
    const medicine = await Drug.findByIdAndDelete(medicineId);

    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    res.status(200).json({ message: 'Medicine deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete medicine', details: err.message });
  }
};

// Search medicines by name, description, or manufacturer
export const searchMedicines = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const medicines = await Drug.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { manufacturer: { $regex: query, $options: 'i' } }
      ]
    });

    res.status(200).json(medicines);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search medicines', details: err.message });
  }
};
