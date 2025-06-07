// src/Casino/GameCard.jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';

/**
 * GameCard
 *
 * Displays a single casino game as a card with its image, name, and a “Play” or “Details” button.
 *
 * Props:
 *   - game: {
 *       id: string,
 *       name: string,
 *       imageUrl: string,
 *       category?: string,     // e.g. "Slots", "Roulette", etc.
 *     }
 */
const GameCard = ({ game }) => {
  const { user } = useAuth();
  const name = game.name || game.title;
  const imageUrl = game.imageUrl || game.thumbnailUrl;
  const playLink = user ? game.playUrl : '/login';
  const anchorProps = user ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <div className="bg-fortino-darkGreen rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* Game thumbnail or icon */}
      <div className="h-40 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-full"
          onError={(e) => {
            // Fallback to a placeholder image if the URL is invalid
            e.currentTarget.src =
              'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      </div>

      {/* Game name and category */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-fortino-softWhite mb-1">
          {name}
        </h3>
        {game.category && (
          <p className="text-sm text-fortino-goldSoft mb-3">
            {game.category}
          </p>
        )}

        {/* Link directly to the game */}
        <a
          href={playLink}
          {...anchorProps}
          className="inline-block bg-fortino-goldSoft text-black font-medium px-4 py-2 rounded-md hover:bg-fortino-goldSoft/90 transition duration-150"
        >
          Play Now
        </a>
      </div>
    </div>
  );
};

export default GameCard;
