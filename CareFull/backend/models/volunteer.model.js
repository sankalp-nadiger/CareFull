// models/Volunteer.js
import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema({
  fitfullDoctorId: { type: String, required: true, unique: true }, // reference to the verified MBBS graduate in Fitfull
  name: { type: String, required: true },
  specialties: [String], // e.g., pediatrics, elderly care
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Check if model already exists to prevent overwrite error during hot reloading
const Volunteer = mongoose.models.Volunteer || mongoose.model('Volunteer', VolunteerSchema);

export default Volunteer;