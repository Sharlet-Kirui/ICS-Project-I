require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

const authStartupRoutes = require('./routes/authStartup');

app.use(cors());
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes

app.use('/api/auth', authStartupRoutes);

// Test route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});


// Contact form route
app.post('/api/contact', async (req, res) => {
  const { website, linkedin, email, contact } = req.body;

  if (!website || !linkedin || !email || !contact) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newContact = new Contact({ website, linkedin, email, contact });
    await newContact.save();
    res.status(201).json({ message: 'Contact info saved successfully.' });
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ message: 'Server error. Could not save contact info.' });
  }
});

// Server and DB connection
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.log('MongoDB Connection Error:', err));