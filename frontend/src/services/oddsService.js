// src/services/oddsService.js
import api from './api';

/**
 * oddsService
 *
 * Service for fetching available sports and odds via your shared API client.
 * All methods return the parsed JSON payload from the backend.
 */
const getSports = async () => {
  // GET /odds/sports → returns an array of { key: string, name: string }
  const response = await api.get('/odds/sports');
  return response.data;
};

const getOddsBySport = async (sportKey) => {
  // GET /odds/sports/:sportKey → returns an array of odds objects for that sport
  const response = await api.get(`/odds/sports/${sportKey}`);
  return response.data;
};

export default {
  getSports,
  getOddsBySport,
};
