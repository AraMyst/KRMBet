import React, { useEffect, useState } from 'react';
import casinoService from '../services/casinoService';
import GameThumbnail from './GameThumbnail';

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
        <GameThumbnail key={game._id || game.id} game={game} />
      ))}
    </div>
  );
};

export default HomeGamesPreview;
