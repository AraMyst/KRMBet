// src/hooks/useBets.js
import { useContext } from 'react';
import { BetsContext } from '../contexts/BetsContext';

/**
 * useBets
 *
 * Custom hook to access bets context values and methods.
 * Provides: bets, betsLoading, betsError, refreshBets(), placeBet(), cancelBet().
 */
export const useBets = () => {
  return useContext(BetsContext);
};