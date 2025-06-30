// backend/controllers/authInvestorController.js

const InvestorProfile = require('../models/investorProfileModel');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// SIGNUP
const signup = async (req, res) => {
  const { companyName, email, password } = req.body;

  try {
    const existingUser = await InvestorProfile.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new InvestorProfile({ companyName, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Investor registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DETAILS
const updateDetails = async (req, res) => {
  try {
    const { email } = req.params;
    const updateData = req.body;

    const investor = await InvestorProfile.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true }
    );

    if (!investor) return res.status(404).json({ message: 'Investor not found' });
    res.status(200).json({ message: 'Details updated successfully', investor });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// DOCUMENTS Upload with Multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage }).fields([
  { name: 'incorporation' },
  { name: 'financials' },
  { name: 'profileImage' }
]);

const uploadDocuments = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'Upload error', error: err.message });

    try {
      const updates = {
        incorporation: req.files.incorporation?.[0].path,
        financials: req.files.financials?.[0].path,
        profileImage: req.files.profileImage?.[0]?.path
      };

      const investor = await InvestorProfile.findOneAndUpdate(
        { email: req.params.email },
        { $set: updates },
        { new: true }
      );

      if (!investor) return res.status(404).json({ message: 'Investor not found' });
      res.json({ message: 'Documents uploaded', profile: investor });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
};

// CONTACTS
const updateContacts = async (req, res) => {
  try {
    const investor = await InvestorProfile.findOneAndUpdate(
      { email: req.params.email },
      {
        phone: `${req.body.countryCode}${req.body.phone}`,
        website: req.body.website,
        linkedin: req.body.linkedin,
        address: req.body.address
      },
      { new: true }
    );
    if (!investor) return res.status(404).json({ message: 'Investor not found' });
    res.json({ message: 'Contact info saved', profile: investor });
  } catch (error) {
    res.status(500).json({ message: 'Update error', error: error.message });
  }
};

module.exports = {
  signup,
  updateDetails,
  uploadDocuments,
  updateContacts
};
