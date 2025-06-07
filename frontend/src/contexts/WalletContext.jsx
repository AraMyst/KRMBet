// src/contexts/WalletContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import paymentService from '../services/paymentService';
import userService from '../services/userService';

/**
 * WalletContext
 *
 * Manages user wallet operations: fetching balance, depositing, and withdrawing.
 */
export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [walletLoading, setWalletLoading] = useState(true);
  const [walletError, setWalletError] = useState('');

  /**
   * refreshBalance
   *
   * Fetches the user's current balance from the backend.
   */
  const refreshBalance = async () => {
    setWalletLoading(true);
    try {
      const data = await userService.getUserDetails();
      setBalance(data.balance);
    } catch (err) {
      console.error(err);
      setWalletError('Failed to load balance.');
    } finally {
      setWalletLoading(false);
    }
  };

  /**
   * deposit
   *
   * Performs a deposit operation and refreshes balance.
   */
  const deposit = async (amount) => {
    try {
      await paymentService.deposit(amount);
      await refreshBalance();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  /**
   * withdraw
   *
   * Performs a withdrawal operation and refreshes balance.
   */
  const withdraw = async (amount) => {
    try {
      await paymentService.withdraw(amount);
      await refreshBalance();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Load balance on mount
  useEffect(() => {
    refreshBalance();
  }, []);

  return (
    <WalletContext.Provider
      value={{ balance, walletLoading, walletError, refreshBalance, deposit, withdraw }}
    >
      {children}
    </WalletContext.Provider>
  );
};
