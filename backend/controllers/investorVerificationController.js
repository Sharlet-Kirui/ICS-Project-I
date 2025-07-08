const InvestorProfile = require('../models/investorProfileModel');
const transporter = require('../config/emailTransporter');

const getPendingInvestors = async (req, res) => {
  try {
    const investors = await InvestorProfile.find({ status: 'pending' });
    res.json(investors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching investors', error });
  }
};

const verifyInvestor = async (req, res) => {
  const { email, decision, comment } = req.body;

  try {
    const investor = await InvestorProfile.findOneAndUpdate(
      { email },
      { status: decision },
      { new: true }
    );
    if (!investor) return res.status(404).json({ message: 'Investor not found' });

    const subject = decision === 'approved' ? 'Your account has been approved' : 'Your account was not approved';
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>${subject}</h2>
        <p>Dear ${investor.fullName || 'user'},</p>
        <p>
          ${
            decision === 'approved'
              ? `Congratulations! Your investor account on Bridge Africa has been approved.<br/><br/>
                 <a href="http://localhost:3000/login" style="background:#28a745;color:white;padding:10px 15px;border:none;border-radius:5px;text-decoration:none;">Login Now</a>`
              : `Unfortunately, your application was not approved.<br/><strong>Reason:</strong> ${comment || 'No reason provided'}`
          }
        </p>
        <p>Thank you,<br/>Bridge Africa Team</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Bridge Africa" <${process.env.EMAIL_USER}>`,
      to: investor.email,
      subject,
      html
    });

    res.json({ message: `Investor ${decision}` });
  } catch (error) {
    res.status(500).json({ message: 'Verification failed', error });
  }
};

module.exports = {
  getPendingInvestors,
  verifyInvestor
};
