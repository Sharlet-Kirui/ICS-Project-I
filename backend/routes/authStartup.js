const express = require('express');
const router = express.Router();
const {
  signup,
  updateDetails,
  uploadDocuments,
  updateContacts,
  saveDetails,
  saveContacts
} = require('../controllers/authStartupController');

router.post('/signup', signup);
router.put('/details/:email', updateDetails);
router.put('/documents/:email', uploadDocuments);
router.put('/contacts/:email', updateContacts);

module.exports = router;
