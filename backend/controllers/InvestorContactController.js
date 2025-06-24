const InvestorContact = require('../models/InvestorContact');

// POST /api/contact
exports.createContact = async (req, res) => {
  try {
    const contact = new InvestorContact(req.body);
    await contact.save();
    res.status(201).json({ message: 'Contact info saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save contact info' });
  }
};

// GET /api/contact
exports.getContacts = async (req, res) => {
  try {
    const contacts = await InvestorContact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};
