// src/pages/AccountPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * AccountPage
 *
 * Provides navigation to the main account sections:
 * details, bets history, and verification.
 */
const AccountPage = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-6">Account</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
          to="/account/details"
          className="p-6 bg-fortino-darkGreen rounded-lg hover:bg-fortino-darkGreen/80 transition"
        >
          <h2 className="text-xl font-medium text-fortino-goldSoft mb-2">
            Account Details
          </h2>
          <p className="text-fortino-softWhite">
            View and update your personal information and balance.
          </p>
        </Link>

        <Link
          to="/account/bets"
          className="p-6 bg-fortino-darkGreen rounded-lg hover:bg-fortino-darkGreen/80 transition"
        >
          <h2 className="text-xl font-medium text-fortino-goldSoft mb-2">
            Bets History
          </h2>
          <p className="text-fortino-softWhite">
            Review your past bets and their status.
          </p>
        </Link>

        <Link
          to="/account/verify"
          className="p-6 bg-fortino-darkGreen rounded-lg hover:bg-fortino-darkGreen/80 transition"
        >
          <h2 className="text-xl font-medium text-fortino-goldSoft mb-2">
            Verification
          </h2>
          <p className="text-fortino-softWhite">
            Upload documents to complete your KYC verification.
          </p>
        </Link>
      </div>
    </div>
);

export default AccountPage;
