// src/hooks/useWallet.js
import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

/**
 * useWallet
 *
 * Custom React hook to fetch and manage the user's wallet balance using the shared API service.
 */
export function useWallet() {
  const [balance, setBalance] = useState(null);
  const [walletLoading, setWalletLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch wallet balance from backend
  const fetchBalance = useCallback(async () => {
    setWalletLoading(true);
    setError(null);
    try {
      const response = await api.get('/wallet/balance');
      setBalance(response.data.balance);
    } catch (err) {
      setError(err);
    } finally {
      setWalletLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return {
    balance,
    refreshBalance: fetchBalance,
    walletLoading,
    error,
  };
}
