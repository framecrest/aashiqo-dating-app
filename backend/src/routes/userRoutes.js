const express = require('express');
const router = express.Router();
const { getUserProfile, updateProfile, getDiscoverProfiles, registerComplete, uploadPhoto } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.route('/profile').get(protect, getUserProfile).put(protect, updateProfile);
router.post('/photo', protect, upload.single('image'), uploadPhoto);
router.get('/discover', protect, getDiscoverProfiles);
router.post('/register-complete', protect, registerComplete);

module.exports = router;
