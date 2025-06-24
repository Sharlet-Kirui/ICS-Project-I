const express = require('express');
const router = express.Router();
const InvestorContactController = require('../controllers/InvestorContactController');

// POST /api/contact
router.post('/', InvestorContactController.createContact);

// GET /api/contact
router.get('/', InvestorContactController.getContacts);

module.exports = router;
