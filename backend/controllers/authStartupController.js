const StartupProfile = require('../models/startupProfileModel');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// SIGNUP
const signup = async (req, res) => {
  const { companyName, email, password } = req.body;

  try {
    const existingUser = await StartupProfile.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new StartupProfile({ companyName, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
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

    const startup = await StartupProfile.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true }
    );

    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    res.status(200).json({ message: 'Details updated successfully', startup });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// DOCUMENTS Upload with Multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage }).fields([
  { name: 'incorporation' }, { name: 'pitchDeck' },
  { name: 'financials' }, { name: 'profileImage' }
]);

const uploadDocuments = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'Upload error', error: err.message });

    try {
      const updates = {
        pitchDeckUrl: req.files.pitchDeck?.[0].path,
        registrationCertificateUrl: req.files.incorporation?.[0].path,
        financialsUrl: req.files.financials?.[0].path,
        profileImageUrl: req.files.profileImage?.[0].path
      };

      const user = await StartupProfile.findOneAndUpdate(
        { email: req.params.email },
        { $set: updates },
        { new: true }
      );

      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'Documents uploaded', profile: user });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
};

// CONTACTS
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
    res.json({ message: 'Contact info saved', profile: user });
  } catch (error) {
    res.status(500).json({ message: 'Update error', error: error.message });
  }
};

const saveDetails = async (req, res) => {
  const { email } = req.params;
  try {
    const profile = await StartupProfile.findOne({ email });
    if (!profile) return res.status(404).json({ message: 'Startup not found' });

    Object.assign(profile, req.body);
    await profile.save();
    res.json({ message: 'Details updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving details', error: err.message });
  }
};

const saveContacts = async (req, res) => {
  const { email } = req.params;
  try {
    const profile = await StartupProfile.findOne({ email });
    if (!profile) return res.status(404).json({ message: 'Startup not found' });

    Object.assign(profile, req.body);
    await profile.save();
    res.json({ message: 'Contact info saved' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving contacts', error: err.message });
  }
};

module.exports = {
  signup,
  updateDetails,
  uploadDocuments,
  updateContacts,
  saveDetails,
  saveContacts,
};
