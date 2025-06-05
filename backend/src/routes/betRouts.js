const express = require('express');
const router = express.Router();
const betController = require('../controllers/betController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protected routes only
router.use(authMiddleware);

// Fetch best odds for a given sport
// GET /api/bets/odds?sport={sportKey}
router.get('/odds', betController.getOdds);

// Create a new bet
// POST /api/bets
router.post('/', betController.createBet);

// Get all bets of authenticated user
// GET /api/bets
router.get('/', betController.getBets);

// Cancel a pending bet
// DELETE /api/bets/:betId
router.delete('/:betId', betController.cancelBet);

module.exports = router;
