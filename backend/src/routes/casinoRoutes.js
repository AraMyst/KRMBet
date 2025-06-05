const express = require('express');
const router = express.Router();
const casinoController = require('../controllers/casinoController');

// Public routes
// Get all available casino games
// GET /api/casino/games
router.get('/games', casinoController.getAllGames);

// Get details for a specific casino game
// GET /api/casino/games/:gameId
router.get('/games/:gameId', casinoController.getGameById);

module.exports = router;
