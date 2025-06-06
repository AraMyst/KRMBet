// backend/src/controllers/eventController.js

const oddsService = require('../services/oddsService');

/**
 * GET /api/events/:sportKey
 *
 * Returns an array of event objects (without odds) for the requested sportKey.
 *
 * Each event object looks like:
 * {
 *   id: "a512a48a58c4329048174217b2cc7ce0",
 *   sport_key: "americanfootball_nfl",
 *   sport_title: "NFL",
 *   commence_time: "2023-01-01T18:00:00Z",
 *   home_team: "Atlanta Falcons",
 *   away_team: "Arizona Cardinals"
 * }
 */
exports.getEventsBySport = async (req, res, next) => {
  try {
    const { sportKey } = req.params;
    if (!sportKey) {
      return res
        .status(400)
        .json({ message: 'Missing required path parameter: sportKey.' });
    }

    // Read optional filters from query string:
    const options = {
      dateFormat: req.query.dateFormat,             // e.g. "iso"
      commenceTimeFrom: req.query.commenceTimeFrom, // e.g. "2023-09-09T00:00:00Z"
      commenceTimeTo: req.query.commenceTimeTo,     // e.g. "2023-09-10T23:59:59Z"
      eventIds: req.query.eventIds                  // e.g. "evt1,evt2"
    };

    const eventsArray = await oddsService.getEventsBySport(sportKey, options);
    return res.status(200).json(eventsArray);
  } catch (err) {
    if (err.code === 'Unauthorized') {
      return res
        .status(401)
        .json({
          message:
            'Unauthorized to access external Odds API for events. Check your API key.',
        });
    }
    next(err);
  }
};
