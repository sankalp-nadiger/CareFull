// controllers/volunteerController.js
const Volunteer = require('../models/Volunteer');

exports.registerVolunteer = async (req, res) => {
  // Validate MBBS graduate via a verification process
  try {
    const volunteer = new Volunteer(req.body);
    // TODO: Add verification step via hospital/university API integration
    await volunteer.save();
    res.status(201).json(volunteer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
