const express = require('express');
const router = express.Router();
const {
  signup,
  updateDetails,
  uploadDocuments,
  updateContacts,
  getInvestorProfile,
  updateInvestorProfile
} = require('../controllers/authInvestorController');

router.post('/signup', signup);
router.put('/details/:email', updateDetails);
router.put('/documents/:email', uploadDocuments);
router.put('/contacts/:email', updateContacts);
router.get('/profile/:email', getInvestorProfile);
router.put('/profile/:email', updateInvestorProfile);

module.exports = router;
