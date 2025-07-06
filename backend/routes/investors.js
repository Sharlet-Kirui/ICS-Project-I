// routes/investors.js
const express = require('express');
const router = express.Router();
const InvestorProfile = require('../models/investorProfileModel');

router.get('/profile/:email', async (req, res) => {
  try {
    const investor = await InvestorProfile.findOne({ email: req.params.email });
    if (!investor) return res.status(404).json({ message: 'Investor not found' });
    res.json(investor);
  } catch (err) {
    console.error('Error fetching investor profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
