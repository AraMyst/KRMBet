// src/Casino/CasinoList.jsx
import React, { useEffect, useState } from 'react';
import casinoService from '../services/casinoService';
import GameCard from './GameCard';

/**
 * CasinoList
 *
 * Fetches all casino games from the backend and renders them in a responsive grid.
 * Displays loading and error states.
 */
const CasinoList = () => {
  // Local state for games array, loading flag, and error message
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch list of games once when component mounts
    const fetchGames = async () => {
      try {
        const data = await casinoService.getGames();
        setGames(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load casino games. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <div>Loading games...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (games.length === 0) {
    return <div>No casino games available at the moment.</div>;
  }

  return (
    <div className="space-y-6 px-4">
      <h2 className="text-3xl font-semibold text-fortino-goldSoft">
        Casino Games
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default CasinoList;
