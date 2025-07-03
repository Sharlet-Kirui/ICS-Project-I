const express = require('express');
const router = express.Router();
const Connection = require('../models/connectionModel');

// Create connection
router.post('/create', async (req, res) => {
  const { senderEmail, senderType, receiverEmail, receiverType } = req.body;

  try {
    const exists = await Connection.findOne({ senderEmail, receiverEmail, status: 'pending' });

    const connection = await Connection.create({
      senderEmail,
      senderType,
      receiverEmail,
      receiverType,
    });

    res.status(201).json(connection);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create connection', error: err.message });
  }
});

// Get all connections related to a user
router.get('/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const pending = await Connection.find({
      receiverEmail: email,
      status: 'pending',
    });

    const accepted = await Connection.find({
      $or: [
        { senderEmail: email },
        { receiverEmail: email }
      ],
      status: 'accepted',
    });

    const sent = await Connection.find({
      senderEmail: email,
      status: 'sent',
    });

    res.json({ pending, accepted, sent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch connections' });
  }
});


// Accept or Reject
router.post('/respond', async (req, res) => {
  const { connectionId, action } = req.body;

  try {
    const updated = await Connection.findByIdAndUpdate(connectionId, { status: action }, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error responding to connection' });
  }
});

module.exports = router;
