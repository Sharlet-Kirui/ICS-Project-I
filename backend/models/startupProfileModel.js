const mongoose = require('mongoose');

const startupProfileSchema = new mongoose.Schema({
  // Basic Info
  companyName: { type: String },
  email: { type: String, unique: true },
  password: { type: String},

  // Details
  pitch: { type: String},
  industry: { type: String },
  businessModel: {
    type: String,
    enum: ['B2B', 'B2C', 'P2P', 'D2C', 'C2C', 'B2B2C']
  },
  stage: {
    type: String,
    enum: ['Pre-Seed', 'Seed', 'Early', 'Growth', 'Expansion', 'Exit']
  },
  country: { type: String},
  foundingYear: { type: Number},
  teamSize: {
    type: String,
    enum: ['1–5', '6–10', '11–50', '51–100', '100+']
  },
  description: { type: String},
  revenue: { type: Number},
  revenueCurrency: { type: String},
  users: { type: Number},
  amountSeeking: { type: Number },
  amountCurrency: { type: String},

  // Documents
  pitchDeckUrl: { type: String },
  registrationCertificateUrl: { type: String },
  financialsUrl: { type: String },
  profileImageUrl: { type: String },

  // Contact Info
  phone: { type: String },
  countryCode: { type: String },
  website: { type: String },
  address: { type: String },
  linkedin: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('StartupProfile', startupProfileSchema);
