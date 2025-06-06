// backend/src/controllers/eventController.js

const oddsService = require('../services/oddsService');

/**
 * GET /api/events/:sportKey
 *
 * Returns a list of “events” (no odds) for the given sportKey.
 * Internally calls oddsService.getOddsBySport(sportKey), then maps to:
 *   {
 *     eventId,
 *     sportKey,
 *     commenceTime,
 *     homeTeam,
 *     awayTeam
 *   }
 *
 * Example response:
 * [
 *   {
 *     eventId: "some-event-id",
 *     sportKey: "soccer_epl",
 *     commenceTime: "2025-06-07T15:00:00.000Z",
 *     homeTeam: "Arsenal",
 *     awayTeam: "Chelsea"
 *   },
 *   { ... }
 * ]
 */
exports.getEventsBySport = async (req, res, next) => {
  try {
    const { sportKey } = req.params;
    if (!sportKey) {
      return res
        .status(400)
        .json({ message: 'Missing required path parameter: sportKey.' });
    }

    // Fetch the raw events + bestOdds data
    const oddsArray = await oddsService.getOddsBySport(sportKey);

    // Map out only event fields (no bestOdds)
    const eventsOnly = oddsArray.map((evt) => ({
      eventId: evt.eventId,
      sportKey: evt.sportKey,
      commenceTime: evt.commenceTime,
      homeTeam: evt.homeTeam,
      awayTeam: evt.awayTeam,
    }));

    return res.status(200).json(eventsOnly);
  } catch (err) {
    if (err.code === 'RateLimit') {
      return res
        .status(429)
        .json({ message: 'External Odds API rate limit exceeded. Try again later.' });
    }
    return next(err);
  }
};
