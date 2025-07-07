const express = require('express');
const router = express.Router();
const {
  signup,
  updateDetails,
  uploadDocuments,
  updateContacts,
  getStartupProfile,
  updateStartupProfile
} = require('../controllers/authStartupController');

router.post('/signup', signup);
router.put('/details/:email', updateDetails);
router.put('/documents/:email', uploadDocuments);
router.put('/contacts/:email', updateContacts);
router.get('/profile/:email', getStartupProfile);
router.put('/profile/:email', updateStartupProfile);

module.exports = router;
