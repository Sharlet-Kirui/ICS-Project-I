const Startup = require('../models/startupProfileModel');
const Investor = require('../models/investorProfileModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Investor.findOne({ email });
    let userType = 'investor';

    if (!user) {
      user = await Startup.findOne({ email });
      userType = 'startup';
    }

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id, email: user.email }, 'yourSecretKey', { expiresIn: '1d' });

    res.status(200).json({
      token,
      userType,
      userId: user._id,
      name: user.fullName || user.firstName || 'User'
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
