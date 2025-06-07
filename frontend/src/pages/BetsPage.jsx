// src/pages/BetsPage.jsx
import React from 'react';
import BetBuilder from '../SportsBetting/BetBuilder';

/**
 * BetsPage
 *
 * Page for constructing and placing new bets.
 */
const BetsPage = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-6">Place a Bet</h1>
      <BetBuilder />
    </div>
  );
};

export default BetsPage;
