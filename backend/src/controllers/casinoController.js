const casinoService = require('../services/casinoService');

// Retrieve all available casino games
// GET /api/casino/games
exports.getAllGames = async (req, res, next) => {
  try {
    // casinoService.getAllGames should return an array of objects:
    // [ { id, title, thumbnailUrl, description }, ... ]
    const games = await casinoService.getAllGames();
    res.status(200).json(games);
  } catch (err) {
    next(err);
  }
};

// Retrieve details for a single casino game
// GET /api/casino/games/:gameId
exports.getGameById = async (req, res, next) => {
  try {
    const { gameId } = req.params;

    if (!gameId) {
      return res.status(400).json({ message: 'gameId parameter is required.' });
    }

    // casinoService.getGameById should:
    // 1) Look up game in database or static config by gameId
    // 2) Return object with detailed info: { id, title, description, config, assets }
    const game = await casinoService.getGameById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found.' });
    }

    res.status(200).json(game);
  } catch (err) {
    next(err);
  }
};
