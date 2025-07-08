// backend/controllers/StartupDashboardController.js
const InvestorProfile = require('../models/investorProfileModel');

const getInvestors = async (req, res) => {
  try {
    const investors = await InvestorProfile.find({}, '-password');
    res.status(200).json(investors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch investor profiles' });
  }
};
const getApprovedInvestors = async (req, res) => {
  try {
    const investors = await InvestorProfile.find({ status: 'approved' }, '-password');
    res.status(200).json(investors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch investor profiles' });
  }
};
const getFilters = async (req, res) => {
  try {
    const investors = await InvestorProfile.find({ status: 'approved' });
    
    const valueOffered = [...new Set(investors.flatMap(inv => inv.valueOffered))];
    const countries = [...new Set(investors.map(inv => inv.country).filter(Boolean))];
    const industries = [...new Set(investors.map(inv => inv.industry).filter(Boolean))];
    const fundingValues = investors.map(inv => inv.fundingAmount || 0);

    const maxFunding = Math.max(...fundingValues);

    res.json({
      valueOffered,
      countries,
      industries,
      fundingRange: [0, maxFunding]
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get filter options' });
  }
};

module.exports = {
  getInvestors,
  getApprovedInvestors,
  getFilters
};
