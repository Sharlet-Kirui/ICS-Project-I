require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

// === MIDDLEWARES ===
app.use(cors({
  // origin: 'https://ics-project.viscerealplate.me/',
  origin: 'https://ics-project.viscerealplate.me/',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// === ROUTE IMPORTS ===
const authStartupRoutes = require('./routes/authStartup');
const authInvestorRoutes = require('./routes/authInvestor');
const authRoutes = require('./routes/auth');
const startupDashboardRoutes = require('./routes/StartupDashboard');
const investorDashboardRoutes = require('./routes/InvestorDashboard');
const emailRoutes = require('./routes/email');
const connectionRoutes = require('./routes/connection');
const notificationRoutes = require('./routes/notifications');
const investorRoutes = require('./routes/investors');
const startupRoutes = require('./routes/startups');
const startupVerificationRoutes = require('./routes/startupVerification');
const investorVerificationRoutes = require('./routes/investorVerification');

// === ROUTE REGISTRATION ===
app.use('/api/auth', authStartupRoutes);
app.use('/api/auth/investor', authInvestorRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/investors', startupDashboardRoutes);
app.use('/api/startups', investorDashboardRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/investors', investorRoutes);
app.use('/api/startups', startupRoutes);
app.use('/api/verification/startups', startupVerificationRoutes);
app.use('/api/verification/investors', investorVerificationRoutes);

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
