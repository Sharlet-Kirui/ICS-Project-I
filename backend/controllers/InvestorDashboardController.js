const Investor = require('../models/Investor');

exports.getDashboardStats = async (req, res) => {
  try {
    const matchedStartups = 15; // placeholder logic
    const pendingInvites = 1;
    const contactRequests = 3;
    res.status(200).json({ matchedStartups, pendingInvites, contactRequests });
  } catch (error) {
    res.status(500).json({ message: 'Error getting stats', error });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Investor.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profiles', error });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const profile = await Investor.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};

exports.createProfile = async (req, res) => {
  try {
    const newInvestor = new Investor(req.body);
    await newInvestor.save();
    res.status(201).json(newInvestor);
  } catch (error) {
    res.status(500).json({ message: 'Error creating profile', error });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updated = await Investor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Investor not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const deleted = await Investor.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Investor not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting profile', error });
  }
};
