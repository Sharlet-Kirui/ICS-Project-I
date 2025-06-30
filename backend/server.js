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


// DB Connection and Server
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.log('MongoDB Connection Error:', err));
