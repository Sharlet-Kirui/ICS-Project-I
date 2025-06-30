require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// Routes
const authStartupRoutes = require('./routes/authStartup');
const authInvestorRoutes = require('./routes/authInvestor'); 
const authRoutes = require('./routes/auth');
const startupDashboardRoutes = require('./routes/StartupDashboard');

app.use('/api/auth', authStartupRoutes);
app.use('/api/auth/investor', authInvestorRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/investors', startupDashboardRoutes);

// Optional: Test route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});


<<<<<<< HEAD
// Contact form route
// ✅ Contact form route
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
//Sign Up
 const contactRoutes = require('./routes/contactRoutes');
app.use('/api/contact', contactRoutes);

//Investor Dashboard
const investorRoutes = require('./routes/InvestorDashboardRoutes');
app.use('/api/investor-dashboard', investorRoutes);

// Server and DB connection
=======
// DB Connection and Server
>>>>>>> 7188d31692879e0081ee97e1ae69ff1e5192ac2a
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.log('MongoDB Connection Error:', err));
