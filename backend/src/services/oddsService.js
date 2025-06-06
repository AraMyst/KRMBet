// backend/src/services/oddsService.js

const axios = require('axios');
const config = require('../utils/config');

/**
 * Fetch all available sports (sport keys) from the external Odds API.
 * Endpoint: GET /v4/sports?apiKey=YOUR_API_KEY
 *
 * Returns an array of sport objects, e.g.:
 * [
 *   {
 *     key: "americanfootball_nfl",
 *     group: "American Football",
 *     title: "NFL",
 *     description: "US Football",
 *     active: true,
 *     has_outrights: false
 *   },
 *   { ... }
 * ]
 */
async function getAllSports() {
  const baseUrl = `${config.ODDS_API_BASE_URL}/sports`;
  const params = {
    apiKey: config.ODDS_API_KEY,
    all: false // Optional: set to true to include both in-season and out-of-season sports
  };

  let response;
  try {
    response = await axios.get(baseUrl, { params });
  } catch (err) {
    // If we get a 401 Unauthorized from the external API, just throw it
    throw err;
  }

  return response.data;
}

/**
 * Fetch upcoming and in-play events for a given sport.
 * Endpoint: GET /v4/sports/{sportKey}/events?apiKey=YOUR_API_KEY&dateFormat=iso
 *
 * Returns an array of event objects, e.g.:
 * [
 *   {
 *     id: "a512a48a58c4329048174217b2cc7ce0",
 *     sport_key: "americanfootball_nfl",
 *     sport_title: "NFL",
 *     commence_time: "2023-01-01T18:00:00Z",
 *     home_team: "Atlanta Falcons",
 *     away_team: "Arizona Cardinals"
 *   },
 *   { ... }
 * ]
 *
 * `options` can include:
 *   - dateFormat: "iso" or "unix"
 *   - commenceTimeFrom: ISO timestamp string (e.g. "2023-09-09T00:00:00Z")
 *   - commenceTimeTo: ISO timestamp string (e.g. "2023-09-10T23:59:59Z")
 *   - eventIds: comma-separated event IDs string (e.g. "evt1,evt2")
 */
async function getEventsBySport(sportKey, options = {}) {
  const baseUrl = `${config.ODDS_API_BASE_URL}/sports/${sportKey}/events`;
  const params = {
    apiKey: config.ODDS_API_KEY,
    dateFormat: options.dateFormat || 'iso',
    ...(options.commenceTimeFrom ? { commenceTimeFrom: options.commenceTimeFrom } : {}),
    ...(options.commenceTimeTo ? { commenceTimeTo: options.commenceTimeTo } : {}),
    ...(options.eventIds ? { eventIds: options.eventIds } : {})
  };

  let response;
  try {
    response = await axios.get(baseUrl, { params });
  } catch (err) {
    if (err.response && err.response.status === 401) {
      const error = new Error('Unauthorized to access external Odds API for events.');
      error.code = 'Unauthorized';
      throw error;
    }
    throw err;
  }

  return response.data;
}

/**
 * Fetch odds for all events of a given sportKey, then determine the best (highest) odds
 * for each outcome across all bookmakers.
 *
 * Endpoint: GET /v4/sports/{sportKey}/odds?apiKey=YOUR_API_KEY&regions={regions}&markets={markets}&dateFormat={dateFormat}&oddsFormat={oddsFormat}&eventIds={optional}
 *
 * We return an array of event objects, each in the form:
 * [
 *   {
 *     eventId: "bda33adca828c09dc3cac3a856aef176",
 *     sportKey: "americanfootball_nfl",
 *     commenceTime: Date,
 *     homeTeam: "Tampa Bay Buccaneers",
 *     awayTeam: "Dallas Cowboys",
 *     bestOdds: {
 *       home_win: Number,
 *       draw: Number (if applicable),
 *       away_win: Number
 *     }
 *   },
 *   { ... }
 * ]
 *
 * `options` can include:
 *   - regions: comma-separated string (e.g. "us,uk,eu")
 *   - markets: comma-separated string (e.g. "h2h,spreads,totals,outrights")
 *   - oddsFormat: "decimal" or "american"
 *   - dateFormat: "iso" or "unix"
 *   - eventIds: comma-separated event IDs if you want to filter to specific events
 */
async function getOddsBySport(sportKey, options = {}) {
  const baseUrl = `${config.ODDS_API_BASE_URL}/sports/${sportKey}/odds`;
  const params = {
    apiKey: config.ODDS_API_KEY,
    regions: options.regions || 'us',
    markets: options.markets || 'h2h',
    oddsFormat: options.oddsFormat || 'decimal',
    dateFormat: options.dateFormat || 'iso',
    ...(options.eventIds ? { eventIds: options.eventIds } : {})
  };

  let response;
  try {
    response = await axios.get(baseUrl, { params });
  } catch (err) {
    // Rate limit
    if (err.response && err.response.status === 429) {
      const error = new Error('Odds API rate limit exceeded');
      error.code = 'RateLimit';
      throw error;
    }
    // Unauthorized
    if (err.response && err.response.status === 401) {
      const error = new Error('Unauthorized to access external Odds API for odds.');
      error.code = 'Unauthorized';
      throw error;
    }
    throw err;
  }

  const eventsWithOdds = response.data; // Array of event objects from external API

  // Each event object example:
  // {
  //   id: 'bda33adca828c09dc3cac3a856aef176',
  //   sport_key: 'americanfootball_nfl',
  //   commence_time: '2021-09-10T00:20:00Z',
  //   home_team: 'Tampa Bay Buccaneers',
  //   away_team: 'Dallas Cowboys',
  //   bookmakers: [
  //     {
  //       key: 'fanduel',
  //       title: 'FanDuel',
  //       last_update: '2021-06-10T10:46:09Z',
  //       markets: [
  //         {
  //           key: 'h2h',
  //           outcomes: [
  //             { name: 'Dallas Cowboys', price: 240 },
  //             { name: 'Tampa Bay Buccaneers', price: -303 }
  //           ]
  //         },
  //         { key: 'spreads', outcomes: [ ... ] }
  //       ]
  //     },
  //     { ... }
  //   ]
  // }

  // For each event, find the highest (best) price for home, draw (if present), and away
  const result = eventsWithOdds.map((evt) => {
    const { id, sport_key, commence_time, home_team, away_team, bookmakers } = evt;

    let bestHome = null;
    let bestDraw = null;
    let bestAway = null;

    for (const book of bookmakers) {
      for (const market of book.markets) {
        if (market.key === 'h2h' && Array.isArray(market.outcomes)) {
          for (const outcome of market.outcomes) {
            // Match home team name
            if (
              outcome.name === home_team &&
              (bestHome === null || outcome.price > bestHome)
            ) {
              bestHome = outcome.price;
            }
            // Match away team name
            if (
              outcome.name === away_team &&
              (bestAway === null || outcome.price > bestAway)
            ) {
              bestAway = outcome.price;
            }
          }
        }
        // If 3-way (draw included), find draw outcome
        if (
          market.key === 'h2h' &&
          Array.isArray(market.outcomes) &&
          market.outcomes.length === 3
        ) {
          const drawOutcome = market.outcomes.find(
            (o) => o.name !== home_team && o.name !== away_team
          );
          if (drawOutcome) {
            if (bestDraw === null || drawOutcome.price > bestDraw) {
              bestDraw = drawOutcome.price;
            }
          }
        }
      }
    }

    const bestOdds = {
      ...(bestHome !== null ? { home_win: bestHome } : {}),
      ...(bestDraw !== null ? { draw: bestDraw } : {}),
      ...(bestAway !== null ? { away_win: bestAway } : {})
    };

    return {
      eventId: id,
      sportKey: sport_key,
      commenceTime: new Date(commence_time),
      homeTeam: home_team,
      awayTeam: away_team,
      bestOdds
    };
  });

  return result;
}

/**
 * Fetch odds for a single event in all requested markets.
 * Endpoint: GET /v4/sports/{sportKey}/events/{eventId}/odds?apiKey=YOUR_API_KEY&regions={regions}&markets={markets}&oddsFormat={oddsFormat}&dateFormat={dateFormat}
 *
 * Returns the full JSON structure (no aggregation), e.g.:
 * {
 *   id: "a512a48a58c4329048174217b2cc7ce0",
 *   sport_key: "americanfootball_nfl",
 *   sport_title: "NFL",
 *   commence_time: "2023-01-01T18:00:00Z",
 *   home_team: "Atlanta Falcons",
 *   away_team: "Arizona Cardinals",
 *   bookmakers: [
 *     {
 *       key: "draftkings",
 *       title: "DraftKings",
 *       last_update: "2023-01-01T05:31:29Z",
 *       markets: [
 *         {
 *           key: "player_pass_tds",
 *           last_update: "2023-01-01T05:31:29Z",
 *           outcomes: [
 *             { name: "Over", description: "David Blough", price: -205, point: 0.5 },
 *             { name: "Under", description: "David Blough", price: 150, point: 0.5 },
 *             ...
 *           ]
 *         }
 *       ]
 *     },
 *     { ... }
 *   ]
 * }
 *
 * `options` can include:
 *   - regions: comma-separated (e.g. "us,uk")
 *   - markets: comma-separated (e.g. "h2h,spreads,totals")
 *   - oddsFormat: "decimal" or "american"
 *   - dateFormat: "iso" or "unix"
 */
async function getEventOdds(sportKey, eventId, options = {}) {
  const baseUrl = `${config.ODDS_API_BASE_URL}/sports/${sportKey}/events/${eventId}/odds`;
  const params = {
    apiKey: config.ODDS_API_KEY,
    regions: options.regions || 'us',
    markets: options.markets || 'h2h',
    oddsFormat: options.oddsFormat || 'decimal',
    dateFormat: options.dateFormat || 'iso'
  };

  let response;
  try {
    response = await axios.get(baseUrl, { params });
  } catch (err) {
    if (err.response && err.response.status === 429) {
      const error = new Error('Odds API rate limit exceeded for event odds.');
      error.code = 'RateLimit';
      throw error;
    }
    if (err.response && err.response.status === 401) {
      const error = new Error('Unauthorized to access external Odds API for event odds.');
      error.code = 'Unauthorized';
      throw error;
    }
    throw err;
  }

  return response.data;
}

module.exports = {
  getAllSports,
  getEventsBySport,
  getOddsBySport,
  getEventOdds
};
