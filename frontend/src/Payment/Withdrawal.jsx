// src/Payment/Withdrawal.jsx
import React, { useState } from 'react';
import paymentService from '../services/paymentService';

/**
 * Withdrawal
 *
 * Allows the user to simulate a withdrawal operation.
 * On submit, it calls paymentService.withdraw({ amount })
 * and displays success or error messages.
 */
const Withdrawal = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    setLoading(true);
    try {
      // Call the backend to simulate withdrawal
      await paymentService.withdraw({ amount: parsed });
      setSuccess(`Successfully withdrew $${parsed.toFixed(2)}.`);
      setAmount('');
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || 'Withdrawal failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-fortino-darkGreen rounded-lg text-fortino-softWhite">
      <h2 className="text-2xl font-semibold mb-4">Withdraw Funds</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-fortino-goldSoft mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="withdraw-amount" className="block text-sm font-medium mb-1">
            Amount (USD)
          </label>
          <input
            id="withdraw-amount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-3 py-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-fortino-goldSoft"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded-md text-white font-medium transition ${
            loading
              ? 'bg-fortino-goldSoft/60 cursor-not-allowed'
              : 'bg-fortino-goldSoft hover:bg-fortino-goldSoft/90'
          }`}
        >
          {loading ? 'Processing...' : 'Withdraw'}
        </button>
      </form>
    </div>
  );
};

export default Withdrawal;
