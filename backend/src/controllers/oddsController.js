// backend/src/controllers/oddsController.js

const oddsService = require('../services/oddsService');

/**
 * GET /api/odds/sports
 *
 * Retorna a lista de todos os esportes (sport keys) disponíveis na The Odds API.
 */
exports.getAllSports = async (req, res, next) => {
  try {
    const sportsArray = await oddsService.getAllSports();
    return res.status(200).json(sportsArray);
  } catch (err) {
    // Se vier 401 da API externa:
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
 * Retorna array de objetos “event + bestOdds” para o sportKey solicitado.
 */
exports.getOddsBySport = async (req, res, next) => {
  try {
    const { sportKey } = req.params;
    if (!sportKey) {
      return res
        .status(400)
        .json({ message: 'Missing required path parameter: sportKey.' });
    }

    // Podemos ler filtros opcionais via query, ex.: ?regions=us,uk&markets=h2h,spreads
    const options = {
      regions: req.query.regions,       // ex.: "us,uk"
      markets: req.query.markets,       // ex.: "h2h,spreads"
      oddsFormat: req.query.oddsFormat, // ex.: "american"
      dateFormat: req.query.dateFormat  // ex.: "iso"
      // eventIds não usamos aqui, esse endpoint traz todos os eventos
    };

    const oddsArray = await oddsService.getOddsBySport(sportKey, options);
    return res.status(200).json(oddsArray);
  } catch (err) {
    if (err.code === 'RateLimit') {
      return res
        .status(429)
        .json({ message: 'External Odds API rate limit exceeded. Try again later.' });
    }
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
 * Retorna todos os mercados (odds) para um único evento específico.
 */
exports.getEventOdds = async (req, res, next) => {
  try {
    const { sportKey, eventId } = req.params;
    if (!sportKey || !eventId) {
      return res
        .status(400)
        .json({ message: 'Missing required path parameters: sportKey and/or eventId.' });
    }

    // Ler filtros opcionais via query string
    const options = {
      regions: req.query.regions,
      markets: req.query.markets,
      oddsFormat: req.query.oddsFormat,
      dateFormat: req.query.dateFormat
    };

    const eventOddsObj = await oddsService.getEventOdds(sportKey, eventId, options);
    return res.status(200).json(eventOddsObj);
  } catch (err) {
    if (err.code === 'RateLimit') {
      return res
        .status(429)
        .json({ message: 'External Odds API rate limit exceeded. Try again later.' });
    }
    if (err.response && err.response.status === 401) {
      return res
        .status(401)
        .json({ message: 'Unauthorized to access external Odds API. Check your API key.' });
    }
    return next(err);
  }
};
