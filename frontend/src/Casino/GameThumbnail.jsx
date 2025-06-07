import React from 'react';
import { useAuth } from '../hooks/useAuth';

/**
 * GameThumbnail
 *
 * Simple image-only representation of a casino game. If the user is logged in,
 * clicking the image will open the game's play URL in a new tab. Otherwise the
 * link redirects to the login page.
 */
const GameThumbnail = ({ game }) => {
  const { user } = useAuth();
  const name = game.name || game.title;
  const imageUrl = game.imageUrl || game.thumbnailUrl;
  const link = user ? game.playUrl : '/login';
  const anchorProps = user ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  const imgElement = (
    <img
      src={imageUrl}
      alt={name}
      className="object-cover w-full h-full rounded-lg"
      onError={(e) => {
        e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image';
      }}
    />
  );

  return (
    <div className="w-48 h-32 overflow-hidden">
      {user ? (
        <a href={link} {...anchorProps}>{imgElement}</a>
      ) : (
        <a href={link}>{imgElement}</a>
      )}
    </div>
  );
};

export default GameThumbnail;
