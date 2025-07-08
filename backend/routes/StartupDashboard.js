// backend/routes/StartupDashboard.js
const express = require('express');
const router = express.Router();
const { getInvestors, getFilters, getApprovedInvestors } = require('../controllers/StartupDashboardController');

router.get('/', getInvestors); // /api/investors
router.get('/approved', getApprovedInvestors);
router.get('/filters', getFilters); // /api/investors/filters

module.exports = router;

