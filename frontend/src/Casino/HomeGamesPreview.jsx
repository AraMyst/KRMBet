import React, { useEffect, useState } from 'react';
import casinoService from '../services/casinoService';
import GameCard from './GameCard';

const HomeGamesPreview = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await casinoService.getGames();
        setGames(data.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };

    fetchGames();
  }, []);

  if (games.length === 0) return null;

  return (
    <div className="flex gap-4 overflow-x-auto py-4">
      {games.map((game) => (
        <div key={game._id || game.id} className="w-64 flex-shrink-0">
          <GameCard game={game} />
        </div>
      ))}
    </div>
  );
};

export default HomeGamesPreview;
