const CasinoGame = require('../models/CasinoGame');
const initialGames = require('../data/initialCasinoGames');

/**
 * Retrieve all casino games available.
 * Returns an array of CasinoGame documents.
 */
async function getAllGames() {
  let games = await CasinoGame.find({});
  if (games.length === 0) {
    games = await CasinoGame.insertMany(initialGames);
  }
  return games;
}

/**
 * Retrieve a casino game by its ID.
 * Returns the CasinoGame document or null if not found.
 */
async function getGameById(gameId) {
  // Assuming gameId corresponds to MongoDB _id
  let game = await CasinoGame.findById(gameId);
  if (!game) {
    await getAllGames();
    game = await CasinoGame.findById(gameId);
  }
  return game;
}

module.exports = {
  getAllGames,
  getGameById,
};
