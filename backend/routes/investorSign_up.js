const express = require('express');
const router = express.Router();
const authController = require('../controllers/investorSign_upController');

router.post('/', authController.signup);

module.exports = router;