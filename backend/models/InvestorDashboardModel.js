const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  jobTitle: String,
  email: { type: String, required: true },
  country: String,
  investorType: String,
  investmentRange: String,
  industry: String,
  startupStage: String,
  valueOffered: String,
  regionOfInterest: String,
  registration: String,
  companyName: String,
});

module.exports = mongoose.models.Investor || mongoose.model('Investor', investorSchema);