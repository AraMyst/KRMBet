// src/pages/PromotionDetailPage.jsx
import React from 'react';
import PromotionDetail from '../Promotions/PromotionDetail';

/**
 * PromotionDetailPage
 *
 * Wrapper page for viewing a single promotion's full details.
 */
const PromotionDetailPage = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-fortino-darkGreen rounded-lg text-fortino-softWhite">
      <PromotionDetail />
    </div>
  );
};

export default PromotionDetailPage;
