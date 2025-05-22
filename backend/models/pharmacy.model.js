// models/Pharmacy.js
import mongoose from "mongoose";

const pharmacySchema = new mongoose.Schema({
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
const pharmacy=mongoose.model('pharmacy', pharmacySchema);
export default pharmacy;
