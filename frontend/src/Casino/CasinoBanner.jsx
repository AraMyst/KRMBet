// src/Casino/CasinoBanner.jsx
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * CasinoBanner
 *
 * A simple hero/banner component for the Casino page.
 * Displays a background image (or color), a headline, and a call-to-action button.
 *
 * You can replace the inline styles or background URL with your own promotional image.
 */
const CasinoBanner = () => {
  return (
    <div
      className="w-full h-64 bg-cover bg-center relative rounded-lg overflow-hidden"
      style={{
        // Example background image—replace URL with your own or use a local image import
        backgroundImage:
          "url('https://images.unsplash.com/photo-1605902711622-cfb43c443c37?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
      }}
    >
      {/* Overlay to darken the background for better text contrast */}
      <div className="absolute inset-0 bg-fortino-darkGreen/70"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl font-bold text-fortino-goldSoft mb-3">
          Welcome to Fortino Casino
        </h1>
        <p className="text-fortino-softWhite mb-5 max-w-xl">
          Discover a variety of thrilling casino games: slots, roulette, poker,
          and more. Play live with real dealers or enjoy instant-play games from
          anywhere.
        </p>
        <Link
          to="/casino/list"
          className="bg-fortino-darkRed text-white font-semibold px-6 py-3 rounded-lg hover:bg-fortino-darkRed/90 transition duration-150"
        >
          Explore Games
        </Link>
      </div>
    </div>
  );
};

export default CasinoBanner;
