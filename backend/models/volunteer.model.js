// models/Volunteer.js
import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialties: [String], // e.g., pediatrics, elderly care
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Volunteer = mongoose.model('Volunteer', VolunteerSchema);

export default Volunteer;