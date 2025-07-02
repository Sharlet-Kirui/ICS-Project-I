const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Connection = require('../models/connectionModel');
require('dotenv').config();

// Define transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// POST /api/email/send-interest
router.post('/send-interest', async (req, res) => {
  const { senderEmail, receiverEmail } = req.body;

  // Validate input
  if (!senderEmail || !receiverEmail) {
    console.error('Missing sender or receiver email:', req.body);
    return res.status(400).json({ error: 'Both senderEmail and receiverEmail are required.' });
  }

  try {
    // Send email
    await transporter.sendMail({
      from: senderEmail,
      to: receiverEmail,
      subject: 'Interest from an Investor',
      text: `An investor with email ${senderEmail} has shown interest in your startup.`,
    });

    // Save connection as 'sent'
    const newConnection = new Connection({
      senderEmail,
      senderType: 'investor',
      receiverEmail,
      receiverType: 'startup',
      status: 'sent',
    });

    await newConnection.save();

    res.status(200).json({ message: 'Interest sent and connection saved.' });
  } catch (error) {
    console.error('Send Interest Error:', error);
    res.status(500).json({ error: 'Failed to send interest' });
  }
});

module.exports = router;
