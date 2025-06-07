// src/utils/constants.js

/**
 * Application-wide constants
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const LOCAL_STORAGE_TOKEN_KEY = 'auth_token';
export const LOCAL_STORAGE_USER_KEY = 'auth_user';

/**
 * Enumerations for bet statuses
 */
export const BET_STATUSES = {
  PENDING: 'pending',
  WON: 'won',
  LOST: 'lost',
};

/**
 * Supported languages for i18n
 */
export const SUPPORTED_LANGUAGES = ['en', 'es', 'pt'];
