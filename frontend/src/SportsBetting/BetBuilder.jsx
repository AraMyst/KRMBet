// src/SportsBetting/BetBuilder.jsx
import React, { useState } from 'react';
import { useBets } from '../hooks/useBets';
import SportSelector from './SportSelector';
import EventList from './EventList';
import OddsTable from './OddsTable';

/**
 * BetBuilder
 *
 * Top-level component that ties together SportSelector, EventList, and OddsTable
 * to build a bet slip. Uses useBets() to place a final bet.
 */
const BetBuilder = () => {
  const [sportKey, setSportKey] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selections, setSelections] = useState([]);
  const [amount, setAmount] = useState('');
  const { placeBet, betsError, betsLoading } = useBets();

  // Handler when a user clicks “Add” in OddsTable
  const handleAddSelection = (odd) => {
    setSelections((prev) => [...prev, odd]);
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent || selections.length === 0 || !amount) return;

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    // Call context to place the bet
    await placeBet({
      eventId: selectedEvent.id,
      selections,
      amount: parsedAmount,
    });

    // Reset slip on success
    setSelections([]);
    setAmount('');
  };

  return (
    <div className="p-6 bg-fortino-darkGreen rounded-lg text-fortino-softWhite">
      <h2 className="text-2xl font-semibold mb-4">Build Your Bet</h2>

      <SportSelector onSportChange={setSportKey} />

      {sportKey && (
        <EventList
          sportKey={sportKey}
          onEventSelect={setSelectedEvent}
        />
      )}

      {selectedEvent && (
        <OddsTable
          eventId={selectedEvent.id}
          onSelectionAdd={handleAddSelection}
        />
      )}

      {/* Bet Slip */}
      {selections.length > 0 && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div className="space-y-1">
            <h3 className="font-medium">Your Selections:</h3>
            <ul className="list-disc list-inside">
              {selections.map((s, i) => (
                <li key={i}>
                  {s.market} – {s.selection} @ {s.price}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label htmlFor="stake" className="block text-sm mb-1">
              Stake Amount (USD)
            </label>
            <input
              id="stake"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-fortino-goldSoft"
            />
          </div>

          {betsError && (
            <p className="text-red-500">{betsError}</p>
          )}

          <button
            type="submit"
            disabled={betsLoading}
            className={`w-full px-4 py-2 rounded-md text-white font-medium transition ${
              betsLoading
                ? 'bg-fortino-goldSoft/60 cursor-not-allowed'
                : 'bg-fortino-goldSoft hover:bg-fortino-goldSoft/90'
            }`}
          >
            {betsLoading ? 'Placing Bet...' : 'Place Bet'}
          </button>
        </form>
      )}
    </div>
  );
};

export default BetBuilder;
