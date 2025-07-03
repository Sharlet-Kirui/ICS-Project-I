// backend/routes/email.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Connection = require('../models/connectionModel');
const InvestorProfile = require('../models/investorProfileModel');
const StartupProfile = require('../models/startupProfileModel'); // NEW
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
  const { senderEmail, receiverEmail, recipientName, senderType = 'investor' } = req.body;

  if (!senderEmail || !receiverEmail || !recipientName) {
    console.error('Missing fields:', req.body);
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    let senderProfile;
    if (senderType === 'investor') {
      senderProfile = await InvestorProfile.findOne({ email: senderEmail });
    } else if (senderType === 'startup') {
      senderProfile = await StartupProfile.findOne({ email: senderEmail });
    }

    if (!senderProfile) {
      return res.status(404).json({ error: 'Sender profile not found' });
    }

    const senderName = senderProfile.companyName || senderEmail;
    const loginUrl = 'http://localhost:3000/login'; 

    const htmlContent = `
      <div style="font-family: 'Poppins', Arial, sans-serif; background-color: #f5f5f5; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <div style="text-align: center;">
            <h2 style="color: #2c3e50;">New Invite</h2>
          </div>

          <p style="font-size: 16px; color: #333;">
            Hi <strong>${recipientName}</strong>,
          </p>

          <p style="font-size: 16px; color: #333;">
            Great news! <strong>${senderName}</strong> (${senderType}) has expressed interest in connecting with you on our platform.
          </p>

          <p style="font-size: 16px; color: #333;">
            To respond and view more details, please log into your account by clicking the button below:
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${loginUrl}" style="background-color: #2c3e50; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">
              Respond Now
            </a>
          </div>

          <p style="font-size: 14px; color: #999; text-align: center;">
            If you did not expect this message, you can safely ignore it.
          </p>
        </div>

        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #999;">
          © ${new Date().getFullYear()} InvestorConnect Platform. All rights reserved.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Bridge Africa" <${process.env.EMAIL_USER}>`,
      to: receiverEmail,
      subject: `${senderType === 'investor' ? 'An Investor' : 'A Startup'} is Interested in You!`,
      html: htmlContent
    });

  // Check for existing connection in either direction
  const existingConnection = await Connection.findOne({
    $or: [
      { senderEmail, receiverEmail },
      { senderEmail: receiverEmail, receiverEmail: senderEmail }
    ]
  });

  // CASE 1: No previous connection → Create new with status 'sent'
  if (!existingConnection) {
    const newConnection = new Connection({
      senderEmail,
      senderType,
      receiverEmail,
      receiverType: senderType === 'investor' ? 'startup' : 'investor',
      status: 'sent',
    });

    await newConnection.save();
    return res.status(200).json({ message: 'Interest sent and connection saved.' });
  }

  // CASE 2: Other party already sent → Convert to 'accepted'
  if (
    existingConnection.senderEmail === receiverEmail &&
    existingConnection.receiverEmail === senderEmail &&
    existingConnection.status === 'sent'
  ) {
    existingConnection.status = 'accepted';
    await existingConnection.save();
    return res.status(200).json({ message: 'Mutual interest! Connection accepted.' });
  }

  // CASE 3: Already sent or accepted by same party → Skip
  return res.status(200).json({ message: 'Interest already sent or accepted. No action taken.' });


    res.status(200).json({ message: 'Interest sent and connection saved.' });
  } catch (error) {
    console.error('Send Interest Error:', error);
    res.status(500).json({ error: 'Failed to send interest email' });
  }
});

module.exports = router;
