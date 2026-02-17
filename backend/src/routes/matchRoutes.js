const express = require('express');
const router = express.Router();
const { swipeUser, getMatches } = require('../controllers/matchController');
const { protect } = require('../middleware/authMiddleware');

router.post('/swipe', protect, swipeUser);
router.get('/', protect, getMatches);

module.exports = router;
