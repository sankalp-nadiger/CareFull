// controllers/volunteerController.js

import Volunteer from '../models/volunteer.model.js';

// Register a new volunteer (MBBS graduate)
export const registerVolunteer = async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);

    // TODO: Add MBBS degree verification logic here
    // e.g., Call hospital/university verification API before saving

    await volunteer.save();
    res.status(201).json({ message: 'Volunteer registered successfully', volunteer });
  } catch (err) {
    res.status(500).json({ error: 'Volunteer registration failed', details: err.message });
  }
};

// Get list of all registered volunteers
export const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.status(200).json(volunteers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch volunteers', details: err.message });
  }
};
