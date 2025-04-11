import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  volunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer', required: true },
  patientFitfullId: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  mode: { type: String, enum: ['Virtual', 'In-Person'], required: true },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled'],
    default: 'Scheduled'
  }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

export default Appointment;
