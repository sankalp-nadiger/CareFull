const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  volunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer', required: true },
  patientFitfullId: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  mode: { type: String, enum: ['Virtual', 'In-Person'], required: true },
  status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
