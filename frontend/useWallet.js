// src/hooks/useWallet.js
import { useState, useEffect, useCallback } from 'react';

/**
 * useWallet
 * 
 * Custom React hook to manage user wallet state.
 * Fetches the current wallet balance from the API and provides a refresh function.
 */
export default function useWallet() {
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch the wallet balance from backend API
  const fetchBalance = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/wallet/balance');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBalance(data.balance);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch balance on mount
  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  /**
   * Returns:
   * - balance: number | null
   * - isLoading: boolean
   * - error: Error | null
   * - refresh: () => void
   */
  return {
    balance,
    isLoading,
    error,
    refresh: fetchBalance,
  };
}
