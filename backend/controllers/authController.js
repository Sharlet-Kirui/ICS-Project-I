const Profile = require('../models/profileModel');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  const { companyName, email, password } = req.body;

  try {
    const existingUser = await Profile.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Profile({
      companyName,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
