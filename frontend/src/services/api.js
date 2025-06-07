// src/services/api.js
import axios from 'axios';

/**
 * api
 *
 * Axios instance configured with base URL and JSON headers.
 * Attaches JWT from localStorage to Authorization header on each request.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Authorization header if token is available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
