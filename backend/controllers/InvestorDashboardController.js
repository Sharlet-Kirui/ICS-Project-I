const Investor = require('../models/InvestorDashboardModel');

exports.createInvestor = async (req, res) => {
  try {
    const investor = new Investor(req.body);
    await investor.save();
    res.status(201).json(investor);
  } catch (err) {
    console.error("Investor creation error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getInvestorByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const investor = await Investor.findOne({ email });
    if (!investor) return res.status(404).json({ error: 'Investor not found' });
    res.json(investor);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: err.message });
  }
};