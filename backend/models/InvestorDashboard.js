const mongoose = require('mongoose');

const investorDashboardSchema = new mongoose.Schema({
  fullName: String,
  jobTitle: String,
  company: String,
  country: String,
  investorType: String,
  investmentRange: String,
  industries: [String],
  startupStage: String,
  valueOffered: [String],
  region: String,
  registration: String
});

module.exports = mongoose.model('InvestorDashboard', investorDashboardSchema);
