// src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useBets } from '../hooks/useBets';
import { useWallet } from '../hooks/useWallet';
import LoadingSpinner from '../Common/LoadingSpinner';

/**
 * Dashboard
 *
 * Displays a summary of the user’s account:
 * welcome message, current balance, recent bets,
 * and quick links to main sections.
 */
const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const {
    bets,
    refreshBets,
    betsLoading,
  } = useBets();
  const {
    balance,
    refreshBalance,
    walletLoading,
  } = useWallet();

  // Load bets and balance on mount
  useEffect(() => {
    refreshBalance();
    refreshBets();
  }, [refreshBalance, refreshBets]);

  if (authLoading || walletLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-8">
      {/* Welcome & Balance */}
      <div className="bg-fortino-darkGreen p-6 rounded-lg text-fortino-softWhite">
        <h1 className="text-3xl font-semibold mb-2">
          Welcome back, {user.username}!
        </h1>
        <p className="text-xl">
          Current Balance:{' '}
          <span className="font-medium">
            ${balance.toFixed(2)}
          </span>
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
          to="/sports"
          className="p-4 bg-fortino-darkGreen rounded-lg hover:bg-fortino-darkGreen/80 transition text-center"
        >
          <h2 className="text-lg font-medium text-fortino-goldSoft mb-1">
            Sports Betting
          </h2>
          <p className="text-sm text-fortino-softWhite">
            Browse events & place bets
          </p>
        </Link>
        <Link
          to="/casino"
          className="p-4 bg-fortino-darkGreen rounded-lg hover:bg-fortino-darkGreen/80 transition text-center"
        >
          <h2 className="text-lg font-medium text-fortino-goldSoft mb-1">
            Casino
          </h2>
          <p className="text-sm text-fortino-softWhite">
            Play slots, roulette & more
          </p>
        </Link>
        <Link
          to="/account/bets"
          className="p-4 bg-fortino-darkGreen rounded-lg hover:bg-fortino-darkGreen/80 transition text-center"
        >
          <h2 className="text-lg font-medium text-fortino-goldSoft mb-1">
            My Bets
          </h2>
          <p className="text-sm text-fortino-softWhite">
            View your betting history
          </p>
        </Link>
      </div>

      {/* Recent Bets */}
      <div className="bg-fortino-darkGreen p-6 rounded-lg text-fortino-softWhite">
        <h2 className="text-2xl font-semibold mb-4">Recent Bets</h2>
        {betsLoading ? (
          <LoadingSpinner />
        ) : bets.length === 0 ? (
          <p>No recent bets found.</p>
        ) : (
          <ul className="space-y-2">
            {bets.slice(0, 5).map((bet) => (
              <li
                key={bet.id}
                className="flex justify-between p-2 bg-fortino-darkBrown rounded-md"
              >
                <span className="truncate">{bet.eventName}</span>
                <span className="font-medium">
                  ${bet.amount.toFixed(2)}
                </span>
                <span className="capitalize">{bet.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
