// src/Promotions/PromotionDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import promotionService from '../services/promotionService';

/**
 * PromotionDetail
 *
 * Fetches and displays detailed information about a single promotion.
 * Shows title, full description, image, bonus details, and terms link.
 */
const PromotionDetail = () => {
  const { id } = useParams();              // extract promotion ID from URL
  const [promo, setPromo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const data = await promotionService.getPromotionById(id);
        setPromo(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load promotion details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPromotion();
  }, [id]);

  if (loading) {
    return <div>Loading promotion...</div>;
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  if (!promo) {
    return <div>Promotion not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-fortino-darkGreen rounded-lg text-fortino-softWhite">
      {/* Promotion Title */}
      <h1 className="text-3xl font-bold mb-4">{promo.title}</h1>

      {/* Promotion Image */}
      {promo.imageUrl && (
        <div className="mb-4 overflow-hidden rounded-lg shadow-lg">
          <img
            src={promo.imageUrl}
            alt={promo.title}
            className="w-full h-64 object-cover"
            onError={(e) => {
              e.currentTarget.src =
                'https://via.placeholder.com/800x400?text=No+Image';
            }}
          />
        </div>
      )}

      {/* Full Description */}
      <p className="mb-4">{promo.fullDescription || promo.description}</p>

      {/* Bonus Details */}
      {promo.bonusPercent && (
        <p className="mb-2">
          <span className="font-medium">Bonus:</span> {promo.bonusPercent}%
        </p>
      )}

      {/* Terms & Conditions Link */}
      {promo.termsUrl && (
        <a
          href={promo.termsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fortino-goldSoft underline"
        >
          View Terms & Conditions
        </a>
      )}
    </div>
  );
};

export default PromotionDetail;
