import mongoose from 'mongoose';

const DrugSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  dosage: String,
  manufacturer: String
});

const Drug = mongoose.model('Drug', DrugSchema);

export default Drug;
