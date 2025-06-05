const axios = require('axios');
const config = require('../utils/config');

/**
 * Fetch odds for a given sportKey from the external Odds API,
 * then determine the best (highest) odds for each outcome across all bookmakers.
 *
 * Returns an array of event objects, each in the form:
 * {
 *   eventId: String,
 *   sportKey: String,
 *   commenceTime: Date,
 *   homeTeam: String,
 *   awayTeam: String,
 *   bestOdds: {
 *     home_win: Number,
 *     draw: Number,       // only for sports/markets that have draw
 *     away_win: Number,
 *     // other outcomes if applicable (e.g., over, under)
 *   }
 * }
 */
async function getOddsBySport(sportKey) {
  // 1) Build URL to fetch all odds for this sport
  const baseUrl = `${config.ODDS_API_BASE_URL}/sports/${sportKey}/odds`;
  const params = {
    apiKey: config.ODDS_API_KEY,
    regions: 'us',       // adjust region filter as needed
    markets: 'h2h',      // head-to-head (1X2); adapt for other markets if necessary
    oddsFormat: 'decimal',
    dateFormat: 'iso',
  };

  let response;
  try {
    response = await axios.get(baseUrl, { params });
  } catch (err) {
    // If external API returns 429, wrap in our own RateLimit error
    if (err.response && err.response.status === 429) {
      const error = new Error('Odds API rate limit exceeded');
      error.code = 'RateLimit';
      throw error;
    }
    // Otherwise propagate
    throw err;
  }

  const eventsWithOdds = response.data; // Array of events from external API
  // Each event object structure (example):
  // {
  //   id: 'some-event-id',
  //   sport_key: 'soccer_epl',
  //   commence_time: '2025-06-07T15:00:00Z',
  //   home_team: 'Arsenal',
  //   away_team: 'Chelsea',
  //   sites: [
  //     { site_key: 'bet365', odds: { h2h: [2.5, 3.1, 2.8] } },
  //     { site_key: 'williamhill', odds: { h2h: [2.55, 3.0, 2.95] } },
  //     // ...
  //   ]
  // }

  // 2) For each event, pick the best (highest) odds for each possible outcome
  const result = eventsWithOdds.map((evt) => {
    const { id, sport_key, commence_time, home_team, away_team, sites } = evt;

    // Initialize best odds with zeros (or nulls)
    let bestHome = 0;
    let bestDraw = 0;
    let bestAway = 0;

    // Iterate over all bookmakers (sites)
    for (const site of sites) {
      const h2hOdds = site.odds.h2h || [];
      // Array h2hOdds format: [home_win_odds, draw_odds, away_win_odds]

      if (h2hOdds.length >= 1 && typeof h2hOdds[0] === 'number' && h2hOdds[0] > bestHome) {
        bestHome = h2hOdds[0];
      }
      // Some sports/markets may not have a draw (e.g., basketball)
      if (h2hOdds.length >= 2 && typeof h2hOdds[1] === 'number' && h2hOdds[1] > bestDraw) {
        bestDraw = h2hOdds[1];
      }
      if (h2hOdds.length >= 3 && typeof h2hOdds[2] === 'number' && h2hOdds[2] > bestAway) {
        bestAway = h2hOdds[2];
      }
    }

    // Build bestOdds object only including draw when relevant
    const bestOdds = {
      home_win: bestHome,
      ...(bestDraw > 0 && { draw: bestDraw }),
      away_win: bestAway,
    };

    return {
      eventId: id,
      sportKey: sport_key,
      commenceTime: new Date(commence_time),
      homeTeam: home_team,
      awayTeam: away_team,
      bestOdds,
    };
  });

  return result;
}

module.exports = {
  getOddsBySport,
};
