// src/pages/PaymentPage.jsx
import React, { useState } from 'react';
import Deposit from '../Payment/Deposit';
import Withdrawal from '../Payment/Withdrawal';

/**
 * PaymentPage
 *
 * Allows the user to switch between Deposit and Withdrawal forms.
 */
const PaymentPage = () => {
  const [mode, setMode] = useState('deposit'); // 'deposit' or 'withdraw'

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-fortino-darkGreen rounded-lg text-fortino-softWhite">
      <h1 className="text-3xl font-semibold mb-6">Payment</h1>

      {/* Mode switcher */}
      <div className="flex mb-6">
        <button
          onClick={() => setMode('deposit')}
          className={`flex-1 py-2 rounded-t-lg ${
            mode === 'deposit'
              ? 'bg-fortino-goldSoft text-black'
              : 'bg-fortino-darkBrown text-fortino-softWhite hover:bg-fortino-darkBrown/80'
          }`}
        >
          Deposit
        </button>
        <button
          onClick={() => setMode('withdraw')}
          className={`flex-1 py-2 rounded-t-lg ${
            mode === 'withdraw'
              ? 'bg-fortino-goldSoft text-black'
              : 'bg-fortino-darkBrown text-fortino-softWhite hover:bg-fortino-darkBrown/80'
          }`}
        >
          Withdraw
        </button>
      </div>

      {/* Render the appropriate form */}
      {mode === 'deposit' ? <Deposit /> : <Withdrawal />}
    </div>
  );
};

export default PaymentPage;
