// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * useAuth
 *
 * Custom hook to access authentication context values and methods.
 * Provides: user, token, loading, authError, setAuthError,
 *           loginUser(), logoutUser().
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
