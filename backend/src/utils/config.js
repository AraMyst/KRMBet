require('dotenv').config();

module.exports = {
  // MongoDB connection URI (Atlas or local fallback)
  DATABASE_URI: process.env.DATABASE_URI || 'mongodb://localhost:27017/bettingdb',

  // JWT secret for signing and verifying tokens
  JWT_SECRET: process.env.JWT_SECRET || 'your_default_jwt_secret',

  // Odds API configuration (read from environment)
  // Point to APILayer Odds endpoint and send API key in HTTP header `apikey`
  ODDS_API_BASE_URL: process.env.ODDS_API_BASE_URL || 'https://api.apilayer.com/odds/v4',
  ODDS_API_KEY: process.env.ODDS_API_KEY || '',

  // Port where the server will listen
  PORT: process.env.PORT || 3000,
};
