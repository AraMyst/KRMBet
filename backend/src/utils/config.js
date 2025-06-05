// utils/config.js

require('dotenv').config();

module.exports = {
  // MongoDB connection URI
  DATABASE_URI: process.env.DATABASE_URI || 'mongodb://localhost:27017/bettingdb',

  // JWT secret for signing and verifying tokens
  JWT_SECRET: process.env.JWT_SECRET || 'your_default_jwt_secret',

  // Odds API configuration
  ODDS_API_BASE_URL: process.env.ODDS_API_BASE_URL || 'https://api.the-odds-api.com/v4',
  ODDS_API_KEY: process.env.ODDS_API_KEY || '',

  // Server port
  PORT: process.env.PORT || 4000,
};
