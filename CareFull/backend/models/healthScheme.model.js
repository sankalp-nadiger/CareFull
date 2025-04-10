// models/HealthScheme.js
const mongoose = require('mongoose');

const HealthSchemeSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  effectiveDate: Date
});

module.exports = mongoose.model('HealthScheme', HealthSchemeSchema);
