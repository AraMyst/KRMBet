// src/services/paymentService.js
import api from './api';

/**
 * paymentService
 *
 * Encapsulates payment simulation calls:
 *   - deposit:    simulate a deposit operation
 *   - withdraw:   simulate a withdrawal operation
 */
const deposit = async ({ amount }) => {
  const response = await api.post('/payment/deposit', { amount });
  // expected response.data: updated balance or confirmation message
  return response.data;
};

const withdraw = async ({ amount }) => {
  const response = await api.post('/payment/withdraw', { amount });
  // expected response.data: updated balance or confirmation message
  return response.data;
};

export default {
  deposit,
  withdraw,
};
