// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFound
 *
 * Renders a 404 page with a link back to the home page.
 */
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <h1 className="text-6xl font-bold text-fortino-goldSoft mb-4">404</h1>
      <p className="text-xl text-fortino-softWhite mb-6">
        Oops! The page you’re looking for can’t be found.
      </p>
      <Link
        to="/"
        className="bg-fortino-darkRed text-white px-6 py-3 rounded-lg hover:bg-fortino-darkRed/90 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
