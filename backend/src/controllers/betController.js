const betService = require('../services/betService');
const oddsService = require('../services/oddsService');

// Fetch odds for a specific sport (using API 2 - TheOddsAPI)
// GET /api/bets/odds?sport={sportKey}
exports.getOdds = async (req, res, next) => {
  try {
    const { sport } = req.query;

    // Validate query param
    if (!sport) {
      return res.status(400).json({ message: 'Sport key is required.' });
    }

    // oddsService.getOddsBySport should:
    // 1) Check cache for existing odds data
    // 2) If not cached or expired, call TheOddsAPI endpoint:
    //    https://api.the-odds-api.com/v4/sports/{sport}/odds?apiKey=...
    // 3) Return parsed JSON array of events with odds
    const oddsData = await oddsService.getOddsBySport(sport);
    res.status(200).json(oddsData);
  } catch (err) {
    // If rate limit exceeded (HTTP 429), oddsService should throw an error code "RateLimit"
    if (err.code === 'RateLimit') {
      return res.status(429).json({ message: 'Odds API rate limit exceeded. Try again later.' });
    }
    next(err);
  }
};

// Create a new bet for the authenticated user
// POST /api/bets
exports.createBet = async (req, res, next) => {
  try {
    const userId = req.user.id; // Populated by authMiddleware
    const { eventId, market, stake, selectedOutcome, oddsValue } = req.body;

    // Validate required fields
    if (!eventId || !market || !stake || !selectedOutcome || typeof oddsValue !== 'number') {
      return res.status(400).json({
        message: 'eventId, market, stake, selectedOutcome and oddsValue are required.',
      });
    }

    // betService.createBet should:
    // 1) Retrieve user by userId and check user.balance >= stake
    // 2) Deduct stake from user.balance
    // 3) Create a Bet record in database with status 'pending'
    //    Fields: { userId, eventId, market, stake, selectedOutcome, oddsValue, status: 'pending', placedAt }
    // 4) Return the created Bet object
    const bet = await betService.createBet({
      userId,
      eventId,
      market,
      stake,
      selectedOutcome,
      oddsValue,
    });

    res.status(201).json(bet);
  } catch (err) {
    // If insufficient funds, betService.createBet throws error code "InsufficientFunds"
    if (err.code === 'InsufficientFunds') {
      return res.status(402).json({ message: 'Insufficient balance to place this bet.' });
    }
    next(err);
  }
};

// List all bets for the authenticated user
// GET /api/bets
exports.getBets = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // betService.getBetsByUser should query Bet model: Bet.findAll({ where: { userId } })
    const bets = await betService.getBetsByUser(userId);
    res.status(200).json(bets);
  } catch (err) {
    next(err);
  }
};

// Cancel a pending bet (if allowed)
// DELETE /api/bets/:betId
exports.cancelBet = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { betId } = req.params;

    if (!betId) {
      return res.status(400).json({ message: 'betId parameter is required.' });
    }

    // betService.cancelBet should:
    // 1) Find bet by betId
    // 2) Verify bet.userId === userId
    // 3) Check bet.status === 'pending'
    // 4) Update bet.status = 'cancelled'
    // 5) Refund stake to user.balance
    // 6) Return true if cancellation succeeded, or false if not found/invalid
    const cancelled = await betService.cancelBet({ userId, betId });

    if (!cancelled) {
      return res.status(404).json({ message: 'Bet not found or cannot be cancelled.' });
    }

    res.status(200).json({ message: 'Bet cancelled successfully.' });
  } catch (err) {
    next(err);
  }
};
