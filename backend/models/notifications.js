const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipientEmail: String,
  senderEmail: String,
  message: String,
  type: String,
  read: Boolean,
  timestamp: Date
});

module.exports = mongoose.model('Notification', notificationSchema);
