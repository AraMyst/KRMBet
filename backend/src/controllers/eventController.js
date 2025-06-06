// backend/src/controllers/eventController.js

const oddsService = require('../services/oddsService');

/**
 * GET /api/events/:sportKey
 *
 * Retorna array de objetos de evento (sem odds) para o sportKey solicitado.
 *
 * Cada objeto:
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

    // Podemos ler filtros opcionais via query: daysFrom, commenceTimeFrom/To, eventIds
    const options = {
      dateFormat: req.query.dateFormat,            // ex.: "iso"
      commenceTimeFrom: req.query.commenceTimeFrom, // ex.: "2023-09-09T00:00:00Z"
      commenceTimeTo: req.query.commenceTimeTo,     // ex.: "2023-09-10T23:59:59Z"
      eventIds: req.query.eventIds                  // ex.: "evt1,evt2"
    };

    const eventsArray = await oddsService.getEventsBySport(sportKey, options);
    return res.status(200).json(eventsArray);
  } catch (err) {
    if (err.code === 'Unauthorized') {
      return res
        .status(401)
        .json({ message: 'Unauthorized to access external Odds API for events. Check your API key.' });
    }
    return next(err);
  }
};
