const express = require('express');
const router = express.Router();
const { getUserProfile, updateProfile, getDiscoverProfiles, registerComplete } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/profile').get(protect, getUserProfile).put(protect, updateProfile);
router.get('/discover', protect, getDiscoverProfiles);
router.post('/register-complete', protect, registerComplete);

module.exports = router;
