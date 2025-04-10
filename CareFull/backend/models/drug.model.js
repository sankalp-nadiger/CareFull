// models/Drug.js
const mongoose = require('mongoose');

const DrugSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  dosage: String,
  manufacturer: String
});

module.exports = mongoose.model('Drug', DrugSchema);
