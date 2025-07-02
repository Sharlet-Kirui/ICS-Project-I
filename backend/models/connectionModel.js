const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  senderEmail: String,
  senderType: String, // 'startup' or 'investor'
  receiverEmail: String,
  receiverType: String,
  status: {
    type: String,
    enum: ['pending', 'sent', 'accepted', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Connection', connectionSchema);
