// src/Casino/GameDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import casinoService from '../services/casinoService';

/**
 * GameDetail
 *
 * Fetches and displays detailed information about a single casino game.
 * This could include description, rules, larger image, and a “Launch Game” button.
 */
const GameDetail = () => {
  // Extract the game ID from the URL params (e.g. /casino/:id)
  const { id } = useParams();

  // Local state for game details, loading, and error
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch game details whenever `id` changes
    const fetchGameDetails = async () => {
      try {
        const data = await casinoService.getGameDetails(id);
        setGame(data);
      } catch (err) {
        console.error(err);
        setError('Unable to load game details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (loading) {
    return <div>Loading game details...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!game) {
    return <div>Game not found.</div>;
  }

  const name = game.name || game.title;
  const imageUrl = game.imageUrl || game.thumbnailUrl;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-fortino-darkGreen rounded-lg text-fortino-softWhite">
      {/* Game Title */}
      <h1 className="text-4xl font-bold mb-4">{name}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Game Image */}
        <div className="md:w-1/2 w-full h-64 md:h-auto overflow-hidden rounded-lg shadow-lg">
          <img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => {
              e.currentTarget.src =
                'https://via.placeholder.com/600x400?text=No+Image';
            }}
          />
        </div>

        {/* Right: Details */}
        <div className="md:w-1/2 w-full">
          {/* Category */}
          {game.category && (
            <p className="text-sm text-fortino-goldSoft mb-2 uppercase tracking-wide">
              {game.category}
            </p>
          )}

          {/* Description */}
          <p className="mb-4">{game.description}</p>

          {/* Additional fields if available (e.g., RTP, volatility) */}
          {game.rtp && (
            <p className="mb-2">
              <span className="font-medium">RTP:</span> {game.rtp}%
            </p>
          )}
          {game.volatility && (
            <p className="mb-2">
              <span className="font-medium">Volatility:</span> {game.volatility}
            </p>
          )}

          {/* “Launch Game” or “Play Now” button */}
          <a
            href={game.playUrl} // Could be a URL to an embedded iframe version or external provider
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-fortino-darkRed text-white font-semibold px-6 py-3 rounded-lg hover:bg-fortino-darkRed/90 transition duration-150"
          >
            Launch Game
          </a>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
