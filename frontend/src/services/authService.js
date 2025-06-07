// src/services/authService.js
import api from './api';

/**
 * authService
 *
 * Encapsulates authentication-related API calls:
 *   - login: POST /auth/login
 *   - register: POST /auth/register
 */
const login = async ({ email, password }) => {
  const response = await api.post('/auth/login', { email, password });
  // Expected response.data: { token: string, user: { ... } }
  return response.data;
};

const register = async ({ username, email, password }) => {
  const response = await api.post('/auth/register', { username, email, password });
  // Expected response.data: { message: string }
  return response.data;
};

export default {
  login,
  register,
};
