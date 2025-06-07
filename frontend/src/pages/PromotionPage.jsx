// src/pages/PromotionPage.jsx
import React, { useEffect, useState } from 'react';
import promotionService from '../services/promotionService';
import PromotionBanner from '../Promotions/PromotionBanner';

/**
 * PromotionPage
 *
 * Fetches all active promotions and renders them as banners.
 */
const PromotionPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const data = await promotionService.getPromotions();
        setPromotions(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load promotions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPromotions();
  }, []);

  if (loading) return <div>Loading promotions...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (promotions.length === 0)
    return <div>No promotions available at the moment.</div>;

  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-6 px-4">
      <h1 className="text-3xl font-semibold text-fortino-goldSoft">
        Promotions
      </h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {promotions.map((promo) => (
          <PromotionBanner key={promo.id} promotion={promo} />
        ))}
      </div>
    </div>
  );
};

export default PromotionPage;
