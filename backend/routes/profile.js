const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Get current user's profile
router.get('/', profileController.getProfile);

// Update current user's profile
router.put('/', profileController.updateProfile);

// Delete current user's profile
router.delete('/',profileController.deleteProfile);

// Get all profiles (admin route)
router.get('/all',profileController.getAllProfiles);


module.exports = router;
