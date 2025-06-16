const Profile = require('../models/profileModel');

// GET all profiles
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// GET a profile by email
exports.getProfileByEmail = async (req, res) => {
  try {
    const profile = await Profile.findOne({ email: req.params.email });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// UPDATE a profile by email
exports.updateProfile = async (req, res) => {
  try {
    const updated = await Profile.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Profile not found' });
    res.json({ message: 'Profile updated successfully', profile: updated });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// DELETE a profile by email
exports.deleteProfile = async (req, res) => {
  try {
    const deleted = await Profile.findOneAndDelete({ email: req.params.email });
    if (!deleted) return res.status(404).json({ message: 'Profile not found' });
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
