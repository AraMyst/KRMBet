const Promotion = require('../models/Promotion');

/**
 * Retrieve all active promotions.
 * Finds promotions where isActive is true.
 * Returns an array of Promotion documents.
 */
async function getAllPromotions() {
  // Ensure promotions' isActive is accurate before query
  const now = new Date();
  await Promotion.updateMany(
    {},
    [
      {
        $set: {
          isActive: {
            $and: [{ $lte: ['$startDate', now] }, { $gte: ['$endDate', now] }],
          },
        },
      },
    ]
  );

  // Return only active promotions
  const promotions = await Promotion.find({ isActive: true }).sort({ startDate: 1 });
  return promotions;
}

/**
 * Retrieve a promotion by its ID.
 * Returns the Promotion document or null if not found.
 */
async function getPromotionById(promotionId) {
  // Update isActive for this specific promotion before returning
  const now = new Date();
  await Promotion.updateOne(
    { _id: promotionId },
    [
      {
        $set: {
          isActive: {
            $and: [{ $lte: ['$startDate', now] }, { $gte: ['$endDate', now] }],
          },
        },
      },
    ]
  );

  const promotion = await Promotion.findById(promotionId);
  return promotion;
}

module.exports = {
  getAllPromotions,
  getPromotionById,
};
