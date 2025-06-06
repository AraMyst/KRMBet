// backend/src/controllers/oddsController.js

const oddsService = require('../services/oddsService');

/**
 * GET /api/odds/:sportKey
 *
 * Calls the external Odds API (via oddsService.getOddsBySport) and returns
 * an array of event‐with‐bestOdds objects for that sportKey.
 *
 * Example response:
 * [
 *   {
 *     eventId: "some-event-id",
 *     sportKey: "soccer_epl",
 *     commenceTime: "2025-06-07T15:00:00.000Z",
 *     homeTeam: "Arsenal",
 *     awayTeam: "Chelsea",
 *     bestOdds: {
 *       home_win: 2.55,
 *       draw: 3.10,
 *       away_win: 2.95
 *     }
 *   },
 *   { ... }
 * ]
 */
exports.getOddsBySport = async (req, res, next) => {
  try {
    const { sportKey } = req.params;
    if (!sportKey) {
      return res
        .status(400)
        .json({ message: 'Missing required path parameter: sportKey.' });
    }

    // Call the service to fetch odds from the external provider
    const oddsArray = await oddsService.getOddsBySport(sportKey);

    return res.status(200).json(oddsArray);
  } catch (err) {
    // If the external API hit a rate limit, we set err.code = "RateLimit"
    if (err.code === 'RateLimit') {
      return res
        .status(429)
        .json({ message: 'External Odds API rate limit exceeded. Try again later.' });
    }
    // Otherwise, propagate to global error handler
    return next(err);
  }
};
