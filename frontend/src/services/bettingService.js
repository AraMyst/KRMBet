// src/services/bettingService.js
import api from './api';

/**
 * bettingService
 *
 * Encapsulates bet-management API calls:
 *   - getUserBets: GET /bets/history
 *   - placeBet:    POST /bets
 *   - cancelBet:   DELETE /bets/:betId
 */
const getUserBets = async () => {
  const response = await api.get('/bets/history');
  // Expected response.data: Array of bet objects
  return response.data;
};

const placeBet = async ({ eventId, selections, amount }) => {
  // `selections` could be an array of pick objects, adjust as needed
  const payload = { eventId, selections, amount };
  const response = await api.post('/bets', payload);
  // Expected response.data: newly created bet object
  return response.data;
};

const cancelBet = async (betId) => {
  const response = await api.delete(`/bets/${betId}`);
  // Expected response.data: confirmation message or updated bet object
  return response.data;
};

export default {
  getUserBets,
  placeBet,
  cancelBet,
};
