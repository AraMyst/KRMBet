// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import HomeGamesPreview from '../Casino/HomeGamesPreview';
import rouletteImage from '../assets/images/roulette-royale.jpg';
import plotLuckImage from '../assets/images/plot-luck.png';
import slotsSorceryImage from '../assets/images/slots-sorcery.png';

/**
 * Home
 *
 * Landing page with quick access to Sports Betting and Casino.
*/
const Home = () => {
  const { user } = useAuth();
  return (
    <div className="max-w-5xl mx-auto mt-12 space-y-12 pb-20">


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
          <Link to={user ? '/sports' : '/login'} className="auth-button mt-4">
            Bet Now
          </Link>
        </div>

        {/* Online Casino */}
        <div className="p-6 bg-fortino-darkGreen rounded-lg hover:bg-fortino-darkGreen/80 transition">
          <h2 className="text-2xl font-semibold text-fortino-softWhite mb-2">
            Online Casino
          </h2>
          <HomeGamesPreview />
          <div className="flex gap-2 my-4">
            <img src={rouletteImage} alt="Roulette Royale" className="w-[200px] rounded" />
            <img src={plotLuckImage} alt="Plot Luck" className="w-[200px] rounded" />
            <img src={slotsSorceryImage} alt="Slots and Sorcery" className="w-[200px] rounded" />
          </div>
          <Link to={user ? '/casino' : '/login'} className="auth-button mt-4">
            Play Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
