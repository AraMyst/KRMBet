// backend/src/utils/database.js

const mongoose = require('mongoose');
const config = require('./config');

/**
 * Initialize MongoDB connection using Mongoose.
 * If connection fails, log the error and exit the process.
 */
async function connectDatabase() {
  try {
    // Em Mongoose v6+, não é preciso passar useNewUrlParser/useUnifiedTopology
    await mongoose.connect(config.DATABASE_URI);
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

module.exports = {
  connectDatabase,
};
