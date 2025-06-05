const CasinoGame = require('../models/CasinoGame');

/**
 * Retrieve all casino games available.
 * Returns an array of CasinoGame documents.
 */
async function getAllGames() {
  const games = await CasinoGame.find({});
  return games;
}

/**
 * Retrieve a casino game by its ID.
 * Returns the CasinoGame document or null if not found.
 */
async function getGameById(gameId) {
  // Assuming gameId corresponds to MongoDB _id
  const game = await CasinoGame.findById(gameId);
  return game;
}

module.exports = {
  getAllGames,
  getGameById,
};
