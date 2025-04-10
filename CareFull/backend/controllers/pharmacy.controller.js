// controllers/pharmacyController.js
const Pharmacy = require('../models/Pharmacy');

exports.getNearbyPharmacies = async (req, res) => {
  const { latitude, longitude } = req.query;
  try {
    const pharmacies = await Pharmacy.find({
      'location.coordinates': {
         $near: {
           $geometry: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
           $maxDistance: 5000  // for example, within 5km radius
         }
      }
    });
    res.json(pharmacies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateInventory = async (req, res) => {
  // Expecting: pharmacyId, drugId, newQuantity
  const { pharmacyId, drugId, newQuantity } = req.body;
  try {
    const pharmacy = await Pharmacy.findById(pharmacyId);
    const item = pharmacy.inventory.find(i => i.drug.toString() === drugId);
    if (item) {
      item.quantity = newQuantity;
    } else {
      pharmacy.inventory.push({ drug: drugId, quantity: newQuantity });
    }
    await pharmacy.save();
    res.json(pharmacy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
