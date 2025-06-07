// src/services/casinoService.js
import api from './api';

/**
 * casinoService
 *
 * Encapsulates casino-related API calls:
 *   - getGames: fetches list of all casino games
 *   - getGameDetails: fetches detailed info for one game by ID
 */
const getGames = async () => {
  const response = await api.get('/casino/games');
  // expected response.data: Array of { id, name, imageUrl, category, ... }
  return response.data;
};

const getGameDetails = async (gameId) => {
  const response = await api.get(`/casino/games/${gameId}`);
  // expected response.data: { id, name, imageUrl, category, description, rtp, volatility, playUrl, ... }
  return response.data;
};

export default {
  getGames,
  getGameDetails,
};
