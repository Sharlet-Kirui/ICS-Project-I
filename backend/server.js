require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);

// Test route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.log('MongoDB Connection Error:', err));
