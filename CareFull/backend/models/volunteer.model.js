const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
  fitfullDoctorId: { type: String, required: true }, // reference to the verified MBBS graduate in Fitfull
  name: String,
  specialties: [String], // e.g., pediatrics, elderly care
  verified: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);
