// src/contexts/BetsContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import bettingService from '../services/bettingService';

/**
 * BetsContext
 *
 * Manages user's bets: fetch history, place new bets, and cancel existing bets.
 */
export const BetsContext = createContext();

export const BetsProvider = ({ children }) => {
  const [bets, setBets] = useState([]);
  const [betsLoading, setBetsLoading] = useState(true);
  const [betsError, setBetsError] = useState('');

  /**
   * refreshBets
   *
   * Fetches the latest bets from the backend.
   */
  const refreshBets = async () => {
    setBetsLoading(true);
    try {
      const data = await bettingService.getUserBets();
      setBets(data);
    } catch (err) {
      console.error(err);
      setBetsError('Failed to load bets history.');
    } finally {
      setBetsLoading(false);
    }
  };

  /**
   * placeBet
   *
   * Sends a new bet to the backend and prepends it to the local list.
   */
  const placeBet = async (betDetails) => {
    try {
      const newBet = await bettingService.placeBet(betDetails);
      setBets((prev) => [newBet, ...prev]);
      return newBet;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  /**
   * cancelBet
   *
   * Cancels a bet by ID and removes it from the local list.
   */
  const cancelBet = async (betId) => {
    try {
      await bettingService.cancelBet(betId);
      setBets((prev) => prev.filter((b) => b.id !== betId));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Load bets on mount
  useEffect(() => {
    refreshBets();
  }, []);

  return (
    <BetsContext.Provider
      value={{ bets, betsLoading, betsError, refreshBets, placeBet, cancelBet }}
    >
      {children}
    </BetsContext.Provider>
  );
};
