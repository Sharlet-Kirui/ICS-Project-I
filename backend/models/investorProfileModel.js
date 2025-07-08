// backend/models/investorProfileModel.js
const mongoose = require('mongoose');

const investorProfileSchema = new mongoose.Schema({
  // Basic Info
  companyName: { type: String },
  email: { type: String, unique: true },
  password: { type: String },

  // Details
  fullName: { type: String },
  jobTitle: { type: String },
  country: { type: String },
  industry: { type: String },
  valueOffered: [{ type: String }], // Funding, Advisory, etc.
  fundingAmount: { type: Number },
  fundingCurrency: { type: String },

  // Documents
  incorporation: { type: String },
  financials: { type: String },
  profileImage: { type: String },

  // Contact Info
  phone: { type: String },
  countryCode: { type: String },
  website: { type: String },
  address: { type: String },
  linkedin: { type: String },

  status: {
  type: String,
  enum: ['pending', 'approved', 'rejected'],
  default: 'pending'
}
}, {
  timestamps: true
});

module.exports = mongoose.model('InvestorProfile', investorProfileSchema);
