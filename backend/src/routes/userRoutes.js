const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// All user routes require authentication
router.use(authMiddleware);

/**
 * Update the authenticated user's profile
 * PUT /api/user/profile
 */
router.put('/profile', userController.updateProfile);

/**
 * Submit account verification data for the authenticated user
 * POST /api/user/verify
 */
router.post('/verify', userController.verifyAccount);

module.exports = router;
