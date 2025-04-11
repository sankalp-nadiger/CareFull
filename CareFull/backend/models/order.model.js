// models/Order.js
import mongoose from "mongoose"


const OrderSchema = new mongoose.Schema({
  patientFitfullId: { type: String, required: true }, // reference to Fitfull patient
  pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy', required: true },
  items: [{
    drug: { type: mongoose.Schema.Types.ObjectId, ref: 'Drug', required: true },
    quantity: { type: Number, required: true }
  }],
  status: { type: String, enum: ['Pending', 'Processed', 'Delivered'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});
const order= mongoose.model('order', OrderSchema);
export default order;