// models/Pharmacy.js
const mongoose = require('mongoose');

const PharmacySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    address: String,
    coordinates: { type: [Number], index: '2dsphere' } // [longitude, latitude]
  },
  inventory: [{
    drug: { type: mongoose.Schema.Types.ObjectId, ref: 'Drug' },
    quantity: { type: Number, default: 0 },
    lowStockThreshold: { type: Number, default: 5 }
  }]
});

module.exports = mongoose.model('Pharmacy', PharmacySchema);
