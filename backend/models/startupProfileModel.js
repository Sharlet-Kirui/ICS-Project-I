const mongoose = require('mongoose');

const startupProfileSchema = new mongoose.Schema({
  // Basic Info
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Details
  pitch: { type: String, required: true },
  industry: { type: String, required: true },
  businessModel: {
    type: String,
    enum: ['B2B', 'B2C', 'P2P', 'D2C', 'C2C', 'B2B2C'],
    required: true
  },
  stage: {
    type: String,
    enum: ['Pre-Seed', 'Seed', 'Early', 'Growth', 'Expansion', 'Exit'],
    required: true
  },
  country: { type: String, required: true },
  foundingYear: { type: Number, required: true },
  teamSize: {
    type: String,
    enum: ['1–5', '6–10', '11–50', '51–100', '100+'],
    required: true
  },
  description: { type: String, required: true },
  revenue: { type: Number, required: true },
  revenueCurrency: { type: String, required: true },
  users: { type: Number, required: true },
  amountSeeking: { type: Number, required: true },
  amountCurrency: { type: String, required: true },

  // Documents (example placeholders)
  pitchDeckUrl: { type: String },
  registrationCertificateUrl: { type: String },

  // Contact Info
  contactName: { type: String },
  phone: { type: String },
  website: { type: String },
  linkedin: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('StartupProfile', startupProfileSchema);
