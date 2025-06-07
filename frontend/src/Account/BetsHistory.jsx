// src/Account/BetsHistory.jsx
import React, { useEffect, useState } from 'react';
import bettingService from '../services/bettingService';

const BetsHistory = () => {
  // Local state: array of bets, loading flag, and any error message
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the user's betting history when this component mounts
    const fetchBets = async () => {
      try {
        const data = await bettingService.getUserBets();
        setBets(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load bets history.');
      } finally {
        setLoading(false);
      }
    };

    fetchBets();
  }, []);

  if (loading) {
    return <div>Loading bets history...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (bets.length === 0) {
    return <div>No bets found.</div>;
  }

  return (
    <div className="p-6 bg-fortino-darkGreen rounded-lg text-fortino-softWhite overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Bets History</h2>

      <table className="min-w-full bg-fortino-darkGreen">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Event</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Odds</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Placed At</th>
          </tr>
        </thead>
        <tbody>
          {bets.map((bet) => (
            <tr
              key={bet.id}
              className="border-b border-fortino-goldSoft hover:bg-fortino-darkGreen/90"
            >
              <td className="px-4 py-2">{bet.eventName}</td>
              <td className="px-4 py-2">${bet.amount.toFixed(2)}</td>
              <td className="px-4 py-2">{bet.odds}</td>
              <td className="px-4 py-2 capitalize">{bet.status}</td>
              <td className="px-4 py-2">
                {new Date(bet.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BetsHistory;
