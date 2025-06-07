// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import userService from '../services/userService';

/**
 * AuthContext
 *
 * Manages authentication state and provides methods to log in, log out,
 * and handle authentication errors.
 */
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(!!token);
  const [authError, setAuthError] = useState('');

  // Fetch user profile if a token exists
  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        try {
          const data = await userService.getUserDetails();
          setUser(data);
        } catch (err) {
          console.error(err);
          logoutUser();
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [token]);

  /**
   * loginUser
   *
   * Saves the token, sets the user, and persists the token in localStorage.
   */
  const loginUser = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  /**
   * logoutUser
   *
   * Clears authentication state and removes token from localStorage.
   */
  const logoutUser = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, authError, setAuthError, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

