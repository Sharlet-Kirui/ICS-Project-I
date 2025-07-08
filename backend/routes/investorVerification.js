const express = require('express');
const router = express.Router();
const { getPendingInvestors, verifyInvestor } = require('../controllers/investorVerificationController');

router.get('/pending', getPendingInvestors);
router.post('/verify', verifyInvestor);

module.exports = router;
