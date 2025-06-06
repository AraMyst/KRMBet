// backend/src/services/oddsService.js

const axios = require('axios');
const config = require('../utils/config');

/**
 * Fetch all available sports (sport keys) from the external Odds API.
 * GET /v4/sports?apiKey=YOUR_API_KEY
 *
 * Returns an array of sport objects:
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
    all: false // Opcional: true para retornar também esportes fora de temporada
  };

  let response;
  try {
    response = await axios.get(baseUrl, { params });
  } catch (err) {
    // Se vier 401 Unauthorized do servidor externo
    throw err;
  }

  return response.data;
}

/**
 * Fetch upcoming and in-play events for a given sport.
 * GET /v4/sports/{sportKey}/events?apiKey=YOUR_API_KEY&dateFormat=iso
 *
 * Returns an array de objetos de evento:
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
 */
async function getEventsBySport(sportKey, options = {}) {
  // options: { dateFormat, commenceTimeFrom, commenceTimeTo, eventIds }
  const baseUrl = `${config.ODDS_API_BASE_URL}/sports/${sportKey}/events`;
  const params = {
    apiKey: config.ODDS_API_KEY,
    dateFormat: options.dateFormat || 'iso',
    ...('commenceTimeFrom' in options ? { commenceTimeFrom: options.commenceTimeFrom } : {}),
    ...('commenceTimeTo' in options ? { commenceTimeTo: options.commenceTimeTo } : {}),
    ...('eventIds' in options ? { eventIds: options.eventIds } : {})
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
 * Fetch odds for a given sportKey from the external Odds API,
 * then determine the best (highest) odds for each outcome across all bookmakers.
 * GET /v4/sports/{sportKey}/odds?regions={regions}&markets={markets}&dateFormat={dateFormat}&oddsFormat={oddsFormat}&eventIds={optional}
 *
 * Estamos usando esta função para retornar apenas as "bestOdds" de cada evento,
 * agrupando todos os bookmakers.
 *
 * Returns an array of event objects, each in the form:
 * [
 *   {
 *     eventId: "bda33adca828c09dc3cac3a856aef176",
 *     sportKey: "americanfootball_nfl",
 *     commenceTime: Date,
 *     homeTeam: "Tampa Bay Buccaneers",
 *     awayTeam: "Dallas Cowboys",
 *     bestOdds: {
 *       home_win: Number,
 *       draw: Number (opcional),
 *       away_win: Number
 *     }
 *   },
 *   { ... }
 * ]
 */
async function getOddsBySport(sportKey, options = {}) {
  // options: { regions, markets, oddsFormat, dateFormat, eventIds }
  const baseUrl = `${config.ODDS_API_BASE_URL}/sports/${sportKey}/odds`;
  const params = {
    apiKey: config.ODDS_API_KEY,
    regions: options.regions || 'us',        // ex.: "us" ou "us,uk,eu"
    markets: options.markets || 'h2h',       // ex.: "h2h,spreads,totals"
    oddsFormat: options.oddsFormat || 'decimal', // "decimal" ou "american"
    dateFormat: options.dateFormat || 'iso',     // "iso" ou "unix"
    ...(options.eventIds ? { eventIds: options.eventIds } : {})
  };

  let response;
  try {
    response = await axios.get(baseUrl, { params });
  } catch (err) {
    // Se retornar 429 (rate limit)
    if (err.response && err.response.status === 429) {
      const error = new Error('Odds API rate limit exceeded');
      error.code = 'RateLimit';
      throw error;
    }
    if (err.response && err.response.status === 401) {
      const error = new Error('Unauthorized to access external Odds API for odds.');
      error.code = 'Unauthorized';
      throw error;
    }
    throw err;
  }

  const eventsWithOdds = response.data; // array de objetos tal como documentado

  // Para cada evento, ele possui:
  // {
  //   id: "bda33adc...", 
  //   sport_key: "americanfootball_nfl",
  //   commence_time: "2021-09-10T00:20:00Z",
  //   home_team: "Tampa Bay Buccaneers",
  //   away_team: "Dallas Cowboys",
  //   bookmakers: [
  //     { 
  //       key: "fanduel",
  //       title: "FanDuel",
  //       last_update: "2021-06-10T10:46:09Z",
  //       markets: [
  //         { key: "h2h", 
  //           outcomes: [
  //             { name: "Dallas Cowboys", price: 240 },
  //             { name: "Tampa Bay Buccaneers", price: -303 }
  //           ]
  //         },
  //         { key: "spreads", outcomes: [ ... ] }
  //       ]
  //     },
  //     { ... }
  //   ]
  // }

  // Agora vamos extrair a “melhor odd” (highest) de cada mercado HEAD-TO-HEAD:
  const result = eventsWithOdds.map((evt) => {
    const {
      id,
      sport_key,
      commence_time,
      home_team,
      away_team,
      bookmakers
    } = evt;

    let bestHome = null;
    let bestDraw = null;
    let bestAway = null;

    // Iterar sobre todos os bookmakers e seus markets
    for (const book of bookmakers) {
      for (const market of book.markets) {
        if (market.key === 'h2h' && Array.isArray(market.outcomes)) {
          // outcomes: [
          //   { name: "Dallas Cowboys", price: 240 },
          //   { name: "Tampa Bay Buccaneers", price: -303 }
          // ]
          // Para saber qual é home e qual é away, precisamos
          // comparar nomes. Neste caso, "home_team" vs "away_team".
          for (const outcome of market.outcomes) {
            if (
              outcome.name === home_team &&
              (bestHome === null || outcome.price > bestHome)
            ) {
              bestHome = outcome.price;
            }
            if (
              outcome.name === away_team &&
              (bestAway === null || outcome.price > bestAway)
            ) {
              bestAway = outcome.price;
            }
            // Se houver empate, não há um draw para esportes sem draw.
          }
        }
        // Mostrar “draw” apenas se existirem 3 outcomes no h2h (ex.: futebol)
        if (market.key === 'h2h' && Array.isArray(market.outcomes) && market.outcomes.length === 3) {
          // outcomes[1] provavelmente é o draw
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
 * Fetch odds for a single event, incluindo todos os mercados especificados.
 * GET /v4/sports/{sportKey}/events/{eventId}/odds?apiKey=...&regions=...&markets=...&oddsFormat=...&dateFormat=...
 *
 * Retorna o JSON completo (sem reduzir para apenas “bestOdds”).
 * Exemplo de retorno:
 * {
 *   "id": "a512a48a58c4329048174217b2cc7ce0",
 *   "sport_key": "americanfootball_nfl",
 *   "sport_title": "NFL",
 *   "commence_time": "2023-01-01T18:00:00Z",
 *   "home_team": "Atlanta Falcons",
 *   "away_team": "Arizona Cardinals",
 *   "bookmakers": [
 *     {
 *       "key": "draftkings",
 *       "title": "DraftKings",
 *       "last_update": "2023-01-01T05:31:29Z",
 *       "markets": [
 *         {
 *           "key": "player_pass_tds",
 *           "last_update": "2023-01-01T05:31:29Z",
 *           "outcomes": [
 *             { "name": "Over", "description": "David Blough", "price": -205, "point": 0.5 },
 *             { "name": "Under", "description": "David Blough", "price": 150, "point": 0.5 },
 *             ...
 *           ]
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
async function getEventOdds(sportKey, eventId, options = {}) {
  // options: { regions, markets, oddsFormat, dateFormat }
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
