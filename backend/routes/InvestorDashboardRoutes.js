const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile
} = require('../controllers/InvestorDashboardController');

router.get('/stats', getDashboardStats);
router.get('/profiles', getAllProfiles);
router.get('/profiles/:id', getProfileById);
router.post('/profiles', createProfile);
router.put('/profiles/:id', updateProfile);
router.delete('/profiles/:id', deleteProfile);

module.exports = router;
