// backend/controllers/InvestorDashboardController.js
const StartupProfile = require('../models/startupProfileModel');

const getStartups = async (req, res) => {
  try {
    const startups = await StartupProfile.find({}, '-password -incorporation -financials');
    res.status(200).json(startups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch startup profiles' });
  }
};

const getFilters = async (req, res) => {
  try {
    const startups = await StartupProfile.find();

    const industries = [...new Set(startups.map(s => s.industry).filter(Boolean))];
    const businessModels = [...new Set(startups.map(s => s.businessModel).filter(Boolean))];
    const stages = [...new Set(startups.map(s => s.stage).filter(Boolean))];
    const countries = [...new Set(startups.map(s => s.country).filter(Boolean))];
    const amountValues = startups.map(s => s.amountSeeking || 0);
    const maxAmount = Math.max(...amountValues);

    res.json({
      industries,
      businessModels,
      stages,
      countries,
      amountRange: [0, maxAmount]
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get filter options' });
  }
};

module.exports = {
  getStartups,
  getFilters
};
