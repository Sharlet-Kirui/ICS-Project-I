require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// === MIDDLEWARES ===
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// === ROUTE IMPORTS ===
const authStartupRoutes = require('./routes/authStartup');
const authInvestorRoutes = require('./routes/authInvestor');
const authRoutes = require('./routes/auth');
const startupDashboardRoutes = require('./routes/StartupDashboard');
const investorDashboardRoutes = require('./routes/InvestorDashboard');

// === ROUTE REGISTRATION ===
app.use('/api/auth', authStartupRoutes);
app.use('/api/auth/investor', authInvestorRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/investors', startupDashboardRoutes);
app.use('/api/startups', investorDashboardRoutes);




// === TEST ROUTE ===
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// === DB CONNECTION AND SERVER START ===
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => {
    console.error(' MongoDB Connection Error:', err);
  });
