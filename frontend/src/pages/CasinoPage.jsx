// src/pages/CasinoPage.jsx
import React from 'react';
import CasinoBanner from '../Casino/CasinoBanner';
import CasinoList from '../Casino/CasinoList';

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
      <CasinoList />
    </div>
  );
};

export default CasinoPage;
