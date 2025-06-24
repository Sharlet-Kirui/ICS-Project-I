const InvestorDashboard = require('../models/InvestorDashboard');

// GET /api/investor-dashboard/stats
const getDashboardStats = (req, res) => {
  res.json({
    matchedStartups: 15,
    pendingInvites: 1,
    contactRequests: 3
  });
};

// GET all profiles
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await InvestorDashboard.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve investor profiles' });
  }
};

// GET profile by ID
const getProfileById = async (req, res) => {
  try {
    const profile = await InvestorDashboard.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving profile' });
  }
};

// POST create profile
const createProfile = async (req, res) => {
  try {
    const newProfile = new InvestorDashboard(req.body);
    const saved = await newProfile.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create profile' });
  }
};

// PUT update profile
const updateProfile = async (req, res) => {
  try {
    const updated = await InvestorDashboard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update profile' });
  }
};

// DELETE profile
const deleteProfile = async (req, res) => {
  try {
    const deleted = await InvestorDashboard.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json({ message: 'Profile deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete profile' });
  }
};

module.exports = {
  getDashboardStats,
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile
};
