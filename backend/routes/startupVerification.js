const express = require('express');
const router = express.Router();
const {
  getPendingStartups,
  verifyStartup
} = require('../controllers/startupVerificationController');

router.get('/pending', getPendingStartups);
router.post('/verify', verifyStartup);

module.exports = router;
