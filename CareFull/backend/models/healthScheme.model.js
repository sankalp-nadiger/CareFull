import mongoose from 'mongoose';

const HealthSchemeSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  effectiveDate: Date
});

const HealthScheme = mongoose.model('HealthScheme', HealthSchemeSchema);

export default HealthScheme;
