const express = require('express');
const router = express.Router();
const Investor = require('../models/Investor');

// Update contact info by investor email
router.put('/contacts/:email', async (req, res) => {
  const { email } = req.params;
  const { phone, website, address, linkedin, countryCode } = req.body;

  try {
    const investor = await Investor.findOneAndUpdate(
      { email },
      { phone, website, address, linkedin, countryCode },
      { new: true }
    );

    if (!investor) {
      return res.status(404).json({ message: 'Investor not found.' });
    }

    res.status(200).json({ message: 'Contact info updated.', investor });
  } catch (err) {
    console.error('Error updating contact info:', err);
    res.status(500).json({ message: 'Server error while updating contact info.' });
  }
});

module.exports = router;
