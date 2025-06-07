// src/pages/CasinoPage.jsx
import React from 'react';
import CasinoBanner from '../Casino/CasinoBanner';
import CasinoList from '../Casino/CasinoList';
import RouletteRoyaleEmbed from '../Casino/RouletteRoyaleEmbed';
import MiniGameEmbed from '../Casino/MiniGameEmbed';

/**
 * CasinoPage
 *
 * The main casino page showing a promotional banner
 * and the list of all available casino games.
 */
const CasinoPage = () => {
  return (
    <div className="space-y-8 mt-8">
      <CasinoBanner />
      <RouletteRoyaleEmbed />
      <div className="flex flex-wrap justify-center gap-4">
        <MiniGameEmbed
          src="https://html-classic.itch.zone/html/6772510/SlotsSorceryWeb/index.html"
          title="Slots and Sorcery"
        />
        <MiniGameEmbed
          src="https://html-classic.itch.zone/html/7128217/index.html"
          title="Plot Luck"
        />
        <MiniGameEmbed
          src="https://html-classic.itch.zone/html/12847895/index.html"
          title="Slot Splitter"
        />
        <MiniGameEmbed
          src="https://html-classic.itch.zone/html/5731992/index.html"
          title="The Casino"
        />
      </div>
      <CasinoList />
    </div>
  );
};

export default CasinoPage;
