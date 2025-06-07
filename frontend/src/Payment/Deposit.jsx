// src/Payment/Deposit.jsx
import React, { useState } from 'react';
import paymentService from '../services/paymentService';

/**
 * Deposit
 *
 * Allows the user to simulate a deposit operation.
 * On submit, it calls paymentService.deposit({ amount })
 * and displays success or error messages.
 */
const Deposit = () => {
  const [amount, setAmount] = useState('');       // input field
  const [loading, setLoading] = useState(false);  // spinner flag
  const [error, setError] = useState('');         // error message
  const [success, setSuccess] = useState('');     // success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate that the amount is a positive number
    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    setLoading(true);
    try {
      // Call the backend to simulate deposit
      await paymentService.deposit({ amount: parsed });
      setSuccess(`Successfully deposited $${parsed.toFixed(2)}.`);
      setAmount('');
    } catch (err) {
      console.error(err);
      // Extract server error or fallback
      const msg =
        err.response?.data?.message || 'Deposit failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-fortino-darkGreen rounded-lg text-fortino-softWhite">
      <h2 className="text-2xl font-semibold mb-4">Deposit Funds</h2>

      {/* Error / Success Messages */}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-fortino-goldSoft mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount Input */}
        <div>
          <label htmlFor="deposit-amount" className="block text-sm font-medium mb-1">
            Amount (USD)
          </label>
          <input
            id="deposit-amount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-3 py-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-fortino-goldSoft"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded-md text-white font-medium transition ${
            loading
              ? 'bg-fortino-goldSoft/60 cursor-not-allowed'
              : 'bg-fortino-goldSoft hover:bg-fortino-goldSoft/90'
          }`}
        >
          {loading ? 'Processing...' : 'Deposit'}
        </button>
      </form>
    </div>
  );
};

export default Deposit;
