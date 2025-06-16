const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/', profileController.getAllProfiles);
router.get('/:email', profileController.getProfileByEmail);
router.put('/:email', profileController.updateProfile);
router.delete('/:email', profileController.deleteProfile);

module.exports = router;
