// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';

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
        <div className="p-6 bg-fortino-darkGreen rounded-lg hover:bg-fortino-darkGreen/80 transition">
          <h2 className="text-2xl font-semibold text-fortino-softWhite mb-2">
            Sports Betting
          </h2>
          <p className="text-fortino-softWhite">
            Browse live odds and place bets on your favorite sports.
          </p>
          <Link
            to="/sports"
            className="inline-block bg-fortino-goldSoft text-fortino-darkGreen px-4 py-2 rounded-md font-medium hover:opacity-90 mt-4"
          >
            Bet Now
          </Link>
        </div>

        {/* Online Casino */}
        <div className="p-6 bg-fortino-darkGreen rounded-lg hover:bg-fortino-darkGreen/80 transition">
          <h2 className="text-2xl font-semibold text-fortino-softWhite mb-2">
            Online Casino
          </h2>
          <p className="text-fortino-softWhite">
            Enjoy slots, roulette, poker and more from your browser.
          </p>
          <Link
            to="/casino"
            className="inline-block bg-fortino-goldSoft text-fortino-darkGreen px-4 py-2 rounded-md font-medium hover:opacity-90 mt-4"
          >
            Play Now
          </Link>
        </div>

        {/* Live Casino */}
        <div className="p-6 bg-fortino-darkGreen rounded-lg hover:bg-fortino-darkGreen/80 transition relative">
          <span className="absolute top-4 right-4 bg-fortino-oliveGreen text-black text-xs font-semibold px-2 py-1 rounded">
            LIVE
          </span>
          <h2 className="text-2xl font-semibold text-fortino-softWhite mb-2">
            Live Casino
          </h2>
          <p className="text-fortino-softWhite">
            Play with real dealers in real-time via live stream.
          </p>
          <Link to="/casino">
            <Button variant="primary" className="mt-4">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
