// routes/startups.js
const express = require('express');
const router = express.Router();
const StartupProfile = require('../models/startupProfileModel');

router.get('/profile/:email', async (req, res) => {
  try {
    const startup = await StartupProfile.findOne({ email: req.params.email });
    if (!startup) return res.status(404).json({ message: 'Startup not found' });
    res.json(startup);
  } catch (err) {
    console.error('Error fetching startup profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
