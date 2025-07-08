// backend/controllers/authInvestorController.js

const InvestorProfile = require('../models/investorProfileModel');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const transporter = require('../config/emailTransporter');

// SIGNUP
const signup = async (req, res) => {
  const { companyName, email, password } = req.body;

  try {
    const existingUser = await InvestorProfile.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new InvestorProfile({ companyName, email, password: hashedPassword,  status: 'pending'  });
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

  await transporter.sendMail({
  from: `"Bridge Africa" <${process.env.EMAIL_USER}>`,
  to: investor.email,
  subject: 'Your Investor Profile is Under Review',
  html:
   `
      <div style="font-family: 'Poppins', Arial, sans-serif; background-color: #f5f5f5; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <div style="text-align: center;">
            <h2 style="color: #2c3e50;">Your Investor Profile is Under Review</h2>
          </div>

          <p style="font-size: 16px; color: #333;">
            Dear <strong> ${investor.companyName || 'User'}</strong>,
          </p>

          <p style="font-size: 16px; color: #333;">
            Thank you for completing your registration on Bridge Africa.
          </p>

          <p style="font-size: 16px; color: #333;">
            Your profile is under review by our team. You will receive an email once it has been approved or rejected.
          </p>

          <p style="font-size: 16px; color: #333;">
            Thank you,<br>Bridge Africa Team
          </p>

          <p style="font-size: 14px; color: #999; text-align: center;">
            If you did not expect this message, you can safely ignore it.
          </p>
        </div>

        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #999;">
          © ${new Date().getFullYear()} InvestorConnect Platform. All rights reserved.
        </div>
      </div>
    `
});

    res.json({ message: 'Contact info saved. Your profile is under review.', profile: investor });

  } catch (error) {
    res.status(500).json({ message: 'Update error', error: error.message });
  }
};

// Fetch investor profile
const getInvestorProfile = async (req, res) => {
  try {
    const investor = await InvestorProfile.findOne({ email: req.params.email });
    if (!investor) return res.status(404).json({ message: 'Investor not found' });
    res.json(investor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// FULL PROFILE UPDATE (PUT)
const updateInvestorProfile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'Upload error', error: err.message });

    try {
      const email = req.params.email;
      const body = req.body;

      const updates = {
        companyName: body.companyName,
        fullName: body.fullName,
        jobTitle: body.jobTitle,
        country: body.country,
        industry: body.industry,
        fundingAmount: body.fundingAmount,
        fundingCurrency: body.fundingCurrency,
        website: body.website,
        address: body.address,
        linkedin: body.linkedin,
        phone: `${body.countryCode || ''}${body.phone || ''}`,
        valueOffered: body.valueOffered
          ? Array.isArray(body.valueOffered)
            ? body.valueOffered
            : body.valueOffered.split(',').map(val => val.trim())
          : []
      };

      if (req.files.profileImage) updates.profileImage = req.files.profileImage[0].path;
      if (req.files.incorporation) updates.incorporation = req.files.incorporation[0].path;
      if (req.files.financials) updates.financials = req.files.financials[0].path;

      const investor = await InvestorProfile.findOneAndUpdate(
        { email },
        { $set: updates },
        { new: true }
      );

      if (!investor) return res.status(404).json({ message: 'Investor not found' });
      res.json({ message: 'Profile updated successfully', investor });
    } catch (error) {
      res.status(500).json({ message: 'Update failed', error: error.message });
    }
  });
};

module.exports = {
  signup,
  updateDetails,
  uploadDocuments,
  updateContacts,
  getInvestorProfile,
  updateInvestorProfile
};
