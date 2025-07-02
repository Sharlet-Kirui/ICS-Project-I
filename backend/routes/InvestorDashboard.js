// backend/routes/InvestorDashboardRoutes.js
const express = require('express');
const router = express.Router();
const { getStartups, getFilters } = require('../controllers/InvestorDashboardController');

router.get('/', getStartups); // /api/startups
router.get('/filters', getFilters); // /api/startups/filters

module.exports = router;
