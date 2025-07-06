// backend/routes/notifications.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/notifications');

// POST: Create a new notification
router.post('/create', async (req, res) => {
  const { recipientEmail, senderEmail, message, type } = req.body;
  try {
    const newNotification = new Notification({
      recipientEmail,
      senderEmail,
      message,
      type,
      read: false,
      timestamp: new Date()
    });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save notification' });
  }
});

router.get('/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const notifications = await Notification.find({
      recipientEmail: { $regex: `^${email}$`, $options: 'i' } // Case-insensitive match
    }).sort({ timestamp: -1 });

    res.json(notifications);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
});



// PUT: Mark a specific notification as read
router.put('/mark-read/:id', async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ message: 'Notification marked as read' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to mark notification as read' });
  }
});

// DELETE: Clear all notifications for a specific user
router.delete('/clear/:email', async (req, res) => {
  try {
    await Notification.deleteMany({ recipientEmail: req.params.email });
    res.json({ message: 'Notifications cleared' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to clear notifications' });
  }
});

module.exports = router;
