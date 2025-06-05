const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
// Register a new user
// POST /api/auth/register
router.post('/register', authController.register);

// Log in a user
// POST /api/auth/login
router.post('/login', authController.login);

// Protected routes
// Get current user's profile
// GET /api/auth/profile
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;
