// src/pages/SportsPage.jsx
import React from 'react';
import BetBuilder from '../SportsBetting/BetBuilder';

/**
 * SportsPage
 *
 * Top-level sports betting page: allows users
 * to select sport, event, odds and place bets.
 */
const SportsPage = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-6 text-fortino-goldSoft">
        Sports Betting
      </h1>
      <BetBuilder />
    </div>
  );
};

export default SportsPage;
