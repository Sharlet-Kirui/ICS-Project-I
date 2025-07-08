// backend/controllers/startupVerificationController.js
const StartupProfile = require('../models/startupProfileModel');
const transporter = require('../config/emailTransporter');

// Get all startups with status 'pending'
const getPendingStartups = async (req, res) => {
  try {
    const pendingStartups = await StartupProfile.find({ status: 'pending' });
    res.status(200).json(pendingStartups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending startups', error: error.message });
  }
};

// Approve or reject a startup profile
const verifyStartup = async (req, res) => {
  const { email, decision, comment } = req.body;
  try {
    const startup = await StartupProfile.findOneAndUpdate(
      { email },
      { status: decision },
      { new: true }
    );

    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    let subject, html;
    if (decision === 'approved') {
      subject = 'Your Startup Profile Has Been Approved!';
      html = `
        <div style="font-family: 'Poppins', Arial, sans-serif; background-color: #f5f5f5; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; padding: 30px;">
            <h2 style="color: #27ae60; text-align: center;">Welcome to Bridge Africa!</h2>
            <p style="font-size: 16px; color: #333;">Dear <strong>${startup.companyName}</strong>,</p>
            <p style="font-size: 16px; color: #333;">Your account has been approved. You can now log in and start connecting with investors.</p>
            <p style="text-align: center;"><a href="http://localhost:3000/login" style="padding: 10px 20px; background-color: #27ae60; color: white; text-decoration: none; border-radius: 5px;">Login Now</a></p>
            <p style="font-size: 16px; color: #333;">Best regards,<br>Bridge Africa Team</p>
          </div>
        </div>
      `;
    } else {
      subject = 'Your Startup Profile Was Not Approved';
      html = `
        <div style="font-family: 'Poppins', Arial, sans-serif; background-color: #f5f5f5; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; padding: 30px;">
            <h2 style="color: #c0392b; text-align: center;">Application Update</h2>
            <p style="font-size: 16px; color: #333;">Dear <strong>${startup.companyName}</strong>,</p>
            <p style="font-size: 16px; color: #333;">Unfortunately, your registration was not approved.</p>
            ${comment ? `<p style="font-size: 16px; color: #333;"><strong>Reason:</strong> ${comment}</p>` : ''}
            <p style="font-size: 16px; color: #333;">You may reach out to support for further clarification.</p>
            <p style="font-size: 16px; color: #333;">Best regards,<br>Bridge Africa Team</p>
          </div>
        </div>
      `;
    }

    await transporter.sendMail({
      from: `"Bridge Africa" <${process.env.EMAIL_USER}>`,
      to: startup.email,
      subject,
      html
    });

    res.status(200).json({ message: `Startup ${decision}`, profile: startup });
  } catch (error) {
    res.status(500).json({ message: 'Verification error', error: error.message });
  }
};

module.exports = {
  getPendingStartups,
  verifyStartup
};
