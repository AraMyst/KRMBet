// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Home
 *
 * Landing page with quick access to Sports Betting, Casino, and Live Casino.
 */
const Home = () => {
  return (
    <div className="max-w-5xl mx-auto mt-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-5xl font-bold text-fortino-goldSoft mb-4">
          Fortino Casino & Sportsbook
        </h1>
        <p className="text-fortino-softWhite text-lg max-w-2xl mx-auto">
          Minimalist, elegant platform for sports betting and casino gaming.
          Play responsibly and enjoy a seamless experience.
        </p>
      </section>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Sports Betting */}
        <Link
          to="/sports"
          className="p-6 bg-fortino-darkGreen rounded-lg hover:bg-fortino-darkGreen/80 transition"
        >
          <h2 className="text-2xl font-semibold text-fortino-softWhite mb-2">
            Sports Betting
          </h2>
          <p className="text-fortino-softWhite">
            Browse live odds and place bets on your favorite sports.
          </p>
          <button className="mt-4 bg-fortino-darkRed text-white px-4 py-2 rounded-lg hover:bg-fortino-darkRed/90 transition">
            Bet Now
          </button>
        </Link>

        {/* Online Casino */}
        <Link
          to="/casino"
          className="p-6 bg-fortino-darkGreen rounded-lg hover:bg-fortino-darkGreen/80 transition"
        >
          <h2 className="text-2xl font-semibold text-fortino-softWhite mb-2">
            Online Casino
          </h2>
          <p className="text-fortino-softWhite">
            Enjoy slots, roulette, poker and more from your browser.
          </p>
          <button className="mt-4 bg-fortino-goldSoft text-black px-4 py-2 rounded-lg hover:bg-fortino-goldSoft/90 transition">
            Play Now
          </button>
        </Link>

        {/* Live Casino */}
        <Link
          to="/casino"
          className="p-6 bg-fortino-darkGreen rounded-lg hover:bg-fortino-darkGreen/80 transition relative"
        >
          <span className="absolute top-4 right-4 bg-fortino-oliveGreen text-black text-xs font-semibold px-2 py-1 rounded">
            LIVE
          </span>
          <h2 className="text-2xl font-semibold text-fortino-softWhite mb-2">
            Live Casino
          </h2>
          <p className="text-fortino-softWhite">
            Play with real dealers in real-time via live stream.
          </p>
          <button className="mt-4 bg-fortino-goldSoft text-black px-4 py-2 rounded-lg hover:bg-fortino-goldSoft/90 transition">
            Learn More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
