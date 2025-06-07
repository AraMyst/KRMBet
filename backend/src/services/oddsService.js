// backend/src/services/oddsService.js

const axios = require('axios');
const config = require('../utils/config');

/**
 * Fetch all available sports (sport keys) from The Odds API v4.
 */
async function getAllSports() {
  const url = `${config.ODDS_API_BASE_URL}/sports`;
  const params = { apiKey: config.ODDS_API_KEY };

  try {
    const { data } = await axios.get(url, { params });
    return data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      const error = new Error('Unauthorized to access external Odds API');
      error.code = 'Unauthorized';
      throw error;
    }
    throw err;
  }
}

/**
 * Fetch in-play & upcoming events for a given sportKey.
 *
 * @param {string} sportKey
 * @param {object} [options]
 *   - dateFormat:       'iso' | 'unix'
 *   - commenceTimeFrom: ISO timestamp
 *   - commenceTimeTo:   ISO timestamp
 *   - eventIds:         comma-separated IDs
 */
async function getEventsBySport(sportKey, options = {}) {
  const url = `${config.ODDS_API_BASE_URL}/sports/${sportKey}/events`;
  const params = {
    apiKey: config.ODDS_API_KEY,
    ...(options.dateFormat       && { dateFormat: options.dateFormat }),
    ...(options.commenceTimeFrom && { commenceTimeFrom: options.commenceTimeFrom }),
    ...(options.commenceTimeTo   && { commenceTimeTo: options.commenceTimeTo }),
    ...(options.eventIds         && { eventIds: options.eventIds }),
  };

  try {
    const { data } = await axios.get(url, { params });
    return data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      const error = new Error('Unauthorized to access external Odds API for events');
      error.code = 'Unauthorized';
      throw error;
    }
    throw err;
  }
}

/**
 * Fetch best head-to-head odds for every event of a given sport.
 *
 * @param {string} sportKey
 * @param {object} [options]
 *   - regions:    'us,uk,eu'
 *   - markets:    'h2h,spreads,totals'
 *   - oddsFormat: 'decimal' | 'american'
 *   - dateFormat: 'iso' | 'unix'
 *   - eventIds:   comma-separated IDs
 */
async function getOddsBySport(sportKey, options = {}) {
  const url = `${config.ODDS_API_BASE_URL}/sports/${sportKey}/odds`;
  const params = {
    apiKey:     config.ODDS_API_KEY,
    regions:    options.regions    || 'us',
    markets:    options.markets    || 'h2h',
    oddsFormat: options.oddsFormat || 'decimal',
    dateFormat: options.dateFormat || 'iso',
    ...(options.eventIds && { eventIds: options.eventIds })
  };

  let response;
  try {
    response = await axios.get(url, { params });
  } catch (err) {
    if (err.response && err.response.status === 429) {
      const error = new Error('External Odds API rate limit exceeded');
      error.code = 'RateLimit';
      throw error;
    }
    if (err.response && err.response.status === 401) {
      const error = new Error('Unauthorized to access external Odds API for odds');
      error.code = 'Unauthorized';
      throw error;
    }
    throw err;
  }

  return response.data.map(evt => {
    const {
      id,
      sport_key,
      commence_time,
      home_team,
      away_team,
      bookmakers
    } = evt;

    let bestHome = 0;
    let bestDraw = 0;
    let bestAway = 0;

    for (const bm of bookmakers) {
      for (const mkt of bm.markets) {
        if (mkt.key === 'h2h') {
          for (const oc of mkt.outcomes) {
            if (oc.name === home_team && oc.price > bestHome) {
              bestHome = oc.price;
            }
            if (oc.name === away_team && oc.price > bestAway) {
              bestAway = oc.price;
            }
            if (oc.name.toLowerCase() === 'draw' && oc.price > bestDraw) {
              bestDraw = oc.price;
            }
          }
        }
      }
    }

    const bestOdds = {
      home_win: bestHome,
      ...(bestDraw > 0 && { draw: bestDraw }),
      away_win: bestAway
    };

    return {
      eventId:      id,
      sportKey:     sport_key,
      commenceTime: new Date(commence_time),
      homeTeam:     home_team,
      awayTeam:     away_team,
      bestOdds
    };
  });
}

/**
 * Fetch full markets & odds for a single event.
 *
 * @param {string} sportKey
 * @param {string} eventId
 * @param {object} [options]
 *   - regions
 *   - markets
 *   - oddsFormat
 *   - dateFormat
 */
async function getEventOdds(sportKey, eventId, options = {}) {
  const url = `${config.ODDS_API_BASE_URL}/sports/${sportKey}/events/${eventId}/odds`;
  const params = {
    apiKey:     config.ODDS_API_KEY,
    regions:    options.regions    || 'us',
    markets:    options.markets    || 'h2h',
    oddsFormat: options.oddsFormat || 'decimal',
    dateFormat: options.dateFormat || 'iso'
  };

  try {
    const { data } = await axios.get(url, { params });
    return data;
  } catch (err) {
    if (err.response && err.response.status === 429) {
      const error = new Error('External Odds API rate limit exceeded for event odds');
      error.code = 'RateLimit';
      throw error;
    }
    if (err.response && err.response.status === 401) {
      const error = new Error('Unauthorized to access external Odds API for event odds');
      error.code = 'Unauthorized';
      throw error;
    }
    throw err;
  }
}

module.exports = {
  getAllSports,
  getEventsBySport,
  getOddsBySport,
  getEventOdds
};
