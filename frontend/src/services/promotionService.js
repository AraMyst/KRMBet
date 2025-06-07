// src/services/promotionService.js
import api from './api';

/**
 * promotionService
 *
 * Encapsulates promotions-related API calls:
 *   - getPromotions:    fetches list of all active promotions
 *   - getPromotionById: fetches detailed info for one promotion by ID
 */
const getPromotions = async () => {
  const response = await api.get('/promotions');
  // expected response.data: Array of { id, title, description, imageUrl, ... }
  return response.data;
};

const getPromotionById = async (promotionId) => {
  const response = await api.get(`/promotions/${promotionId}`);
  // expected response.data: { id, title, fullDescription, imageUrl, bonusPercent, termsUrl, ... }
  return response.data;
};

export default {
  getPromotions,
  getPromotionById,
};
