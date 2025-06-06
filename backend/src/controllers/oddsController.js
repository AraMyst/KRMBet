const oddsService = require('../services/oddsService');

/**
 * GET /api/odds/sports
 *
 * Returns the list of all sports (sport keys) available in The Odds API.
 */
exports.getAllSports = async (req, res, next) => {
  try {
    const sportsArray = await oddsService.getAllSports();
    return res.status(200).json(sportsArray);
  } catch (err) {
    // If we receive a 401 from the external API, respond with a clear message
    if (err.response && err.response.status === 401) {
      return res
        .status(401)
        .json({ message: 'Unauthorized to access external Odds API. Check your API key.' });
    }
    return next(err);
  }
};

/**
 * GET /api/odds/:sportKey
 *
 * Returns an array of objects “event + bestOdds” for the requested sportKey.
 */
exports.getOddsBySport = async (req, res, next) => {
  try {
    const { sportKey } = req.params;
    if (!sportKey) {
      return res
        .status(400)
        .json({ message: 'Missing required path parameter: sportKey.' });
    }

    // We can read optional filters via query string, e.g.: ?regions=us,uk&markets=h2h,spreads
    const options = {
      regions: req.query.regions,        // e.g.: "us,uk"
      markets: req.query.markets,        // e.g.: "h2h,spreads"
      oddsFormat: req.query.oddsFormat,  // e.g.: "decimal" or "american"
      dateFormat: req.query.dateFormat   // e.g.: "iso"
      // eventIds not used here, this endpoint returns all events for the sport
    };

    const oddsArray = await oddsService.getOddsBySport(sportKey, options);
    return res.status(200).json(oddsArray);
  } catch (err) {
    // Rate limit handling
    if (err.code === 'RateLimit') {
      return res
        .status(429)
        .json({ message: 'External Odds API rate limit exceeded. Try again later.' });
    }
    // Unauthorized handling
    if (err.response && err.response.status === 401) {
      return res
        .status(401)
        .json({ message: 'Unauthorized to access external Odds API. Check your API key.' });
    }
    return next(err);
  }
};

/**
 * GET /api/odds/:sportKey/events/:eventId
 *
 * Returns all markets (odds) for a single specific event.
 */
exports.getEventOdds = async (req, res, next) => {
  try {
    const { sportKey, eventId } = req.params;
    if (!sportKey || !eventId) {
      return res
        .status(400)
        .json({ message: 'Missing required path parameters: sportKey and/or eventId.' });
    }

    // Read optional filters via query string
    const options = {
      regions: req.query.regions,
      markets: req.query.markets,
      oddsFormat: req.query.oddsFormat,
      dateFormat: req.query.dateFormat
    };

    const eventOddsObj = await oddsService.getEventOdds(sportKey, eventId, options);
    return res.status(200).json(eventOddsObj);
  } catch (err) {
    // Rate limit handling
    if (err.code === 'RateLimit') {
      return res
        .status(429)
        .json({ message: 'External Odds API rate limit exceeded. Try again later.' });
    }
    // Unauthorized handling
    if (err.response && err.response.status === 401) {
      return res
        .status(401)
        .json({ message: 'Unauthorized to access external Odds API. Check your API key.' });
    }
    return next(err);
  }
};
