const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, required: true, unique: true },
  jobTitle: String,
  country: String,
  investorType: String,
  investmentRange: String,
  industry: String,
  startupStage: String,
  valueOffered: String,
  regionOfInterest: String,
  registration: String,
  // Add contact fields:
  phone: String,
  website: String,
  address: String,
  linkedin: String,
  countryCode: String
});

module.exports = mongoose.model('Investor', investorSchema);
