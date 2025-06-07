// src/SportsBetting/OddsTable.jsx
import React, { useEffect, useState } from 'react';
import oddsService from '../services/oddsService';

/**
 * OddsTable
 *
 * Fetches and displays odds for a given event.
 * Calls onSelectionAdd when a user adds an odd to their bet slip.
 *
 * Props:
 *   - eventId: string
 *   - onSelectionAdd: (selection: { market, selection, price }) => void
 */
const OddsTable = ({ eventId, onSelectionAdd }) => {
  const [odds, setOdds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!eventId) return;

    const fetchOdds = async () => {
      setLoading(true);
      try {
        const data = await oddsService.getOdds(eventId);
        setOdds(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load odds.');
      } finally {
        setLoading(false);
      }
    };

    fetchOdds();
  }, [eventId]);

  if (loading) return <div>Loading odds...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (odds.length === 0) return <div>No odds available.</div>;

  return (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full bg-fortino-darkGreen rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Market</th>
            <th className="px-4 py-2 text-left">Selection</th>
            <th className="px-4 py-2 text-left">Odds</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {odds.map((odd, idx) => (
            <tr
              key={idx}
              className="border-b border-fortino-goldSoft hover:bg-fortino-darkGreen/90"
            >
              <td className="px-4 py-2">{odd.market}</td>
              <td className="px-4 py-2">{odd.selection}</td>
              <td className="px-4 py-2">{odd.price}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onSelectionAdd(odd)}
                  className="bg-fortino-goldSoft text-black px-3 py-1 rounded-md hover:bg-fortino-goldSoft/90 transition duration-150"
                >
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OddsTable;
