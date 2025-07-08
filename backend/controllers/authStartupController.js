const StartupProfile = require('../models/startupProfileModel');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const transporter = require('../config/emailTransporter'); // ✅ assumes this file exports a configured nodemailer transporter

// ========== SIGNUP ==========
const signup = async (req, res) => {
  const { companyName, email, password } = req.body;

  try {
    const existingUser = await StartupProfile.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new StartupProfile({
      companyName,
      email,
      password: hashedPassword,
      status: 'pending'
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ========== DETAILS ==========
const updateDetails = async (req, res) => {
  try {
    const { email } = req.params;
    const updateData = req.body;

    const startup = await StartupProfile.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true }
    );

    if (!startup) return res.status(404).json({ message: 'Startup not found' });

    res.status(200).json({ message: 'Details updated successfully', startup });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// ========== DOCUMENTS ==========
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage }).fields([
  { name: 'incorporation' },
  { name: 'pitchDeck' },
  { name: 'financials' },
  { name: 'profileImage' }
]);

const uploadDocuments = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'Upload error', error: err.message });

    try {
      const updates = {
        pitchDeckUrl: req.files.pitchDeck?.[0]?.path,
        registrationCertificateUrl: req.files.incorporation?.[0]?.path,
        financialsUrl: req.files.financials?.[0]?.path,
        profileImageUrl: req.files.profileImage?.[0]?.path
      };

      const startup = await StartupProfile.findOneAndUpdate(
        { email: req.params.email },
        { $set: updates },
        { new: true }
      );

      if (!startup) return res.status(404).json({ message: 'Startup not found' });
      res.json({ message: 'Documents uploaded', profile: startup });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
};

// ========== CONTACTS ==========
const updateContacts = async (req, res) => {
  try {
    const user = await StartupProfile.findOneAndUpdate(
      { email: req.params.email },
      {
        phone: `${req.body.countryCode}${req.body.phone}`,
        website: req.body.website,
        linkedin: req.body.linkedin,
        address: req.body.address
      },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    await transporter.sendMail({
      from: `"Bridge Africa" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Your Startup Profile is Under Review',
      html: `
        <div style="font-family: 'Poppins', Arial, sans-serif; background-color: #f5f5f5; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <div style="text-align: center;">
              <h2 style="color: #2c3e50;">Your Startup Profile is Under Review</h2>
            </div>
            <p style="font-size: 16px; color: #333;">
              Dear <strong>${user.companyName || 'User'}</strong>,
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
        </div>`
    });

    res.json({ message: 'Contact info saved. Your profile is under review.', profile: user });

  } catch (error) {
    console.error('Contacts update error:', error);
    res.status(500).json({ message: 'Update error', error: error.message });
  }
};

// ========== GET PROFILE ==========
const getStartupProfile = async (req, res) => {
  try {
    const startup = await StartupProfile.findOne({ email: req.params.email });
    if (!startup) return res.status(404).json({ message: 'Startup not found' });
    res.json(startup);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ========== FULL PROFILE UPDATE ==========
const updateStartupProfile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'Upload error', error: err.message });

    try {
      const email = req.params.email;
      const body = req.body;

      const updates = {
        companyName: body.companyName,
        pitch: body.pitch,
        industry: body.industry,
        businessModel: body.businessModel,
        stage: body.stage,
        country: body.country,
        foundingYear: body.foundingYear,
        teamSize: body.teamSize,
        description: body.description,
        revenue: body.revenue,
        revenueCurrency: body.revenueCurrency,
        users: body.users,
        amountSeeking: body.amountSeeking,
        amountCurrency: body.amountCurrency,
        website: body.website,
        address: body.address,
        linkedin: body.linkedin,
        phone: `${body.countryCode || ''}${body.phone || ''}`
      };

      if (req.files.profileImageUrl) updates.profileImageUrl = req.files.profileImageUrl[0].path;
      if (req.files.pitchDeck) updates.pitchDeckUrl = req.files.pitchDeck[0].path;
      if (req.files.registrationCertificate) updates.registrationCertificateUrl = req.files.registrationCertificate[0].path;
      if (req.files.financials) updates.financialsUrl = req.files.financials[0].path;

      const startup = await StartupProfile.findOneAndUpdate(
        { email },
        { $set: updates },
        { new: true }
      );

      if (!startup) return res.status(404).json({ message: 'Startup not found' });
      res.json({ message: 'Profile updated successfully', startup });

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
  getStartupProfile,
  updateStartupProfile
};
