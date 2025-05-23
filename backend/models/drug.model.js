import mongoose from 'mongoose';

const DrugSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true, min: 0 },
  manufacturer: String,
  category: String,
  prescriptionRequired: { type: Boolean, default: false },
  dosage: String
});

const Drug = mongoose.model('Drug', DrugSchema);

export default Drug;
