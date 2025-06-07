// src/Promotions/PromotionBanner.jsx
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PromotionBanner
 *
 * Displays a promotional banner with background image, title,
 * brief description, and a link to the promotion detail page.
 *
 * Props:
 *   - promotion: {
 *       id: string,
 *       title: string,
 *       description: string,
 *       imageUrl: string
 *     }
 */
const PromotionBanner = ({ promotion }) => {
  return (
    <div
      className="w-full h-48 bg-cover bg-center relative rounded-lg overflow-hidden"
      style={{ backgroundImage: `url('${promotion.imageUrl}')` }}
    >
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-fortino-darkGreen/60"></div>

      <div className="relative z-10 flex flex-col justify-center h-full p-6 text-fortino-softWhite">
        <h3 className="text-2xl font-bold mb-2">{promotion.title}</h3>
        <p className="mb-4 line-clamp-2">{promotion.description}</p>
        <Link
          to={`/promotions/${promotion.id}`}
          className="self-start bg-fortino-goldSoft text-black px-4 py-2 rounded-md hover:bg-fortino-goldSoft/90 transition duration-150"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default PromotionBanner;
