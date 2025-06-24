const mongoose = require('mongoose');

const investorContactSchema = new mongoose.Schema({
  website: {
    type: String,
    required: true
  },
  linkedin: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('InvestorContact', investorContactSchema);
