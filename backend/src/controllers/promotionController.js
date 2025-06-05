const promotionService = require('../services/promotionService');

// Retrieve all active promotions
// GET /api/promotions
exports.getAllPromotions = async (req, res, next) => {
  try {
    // promotionService.getAllPromotions should return an array:
    // [ { id, title, description, bannerUrl, startDate, endDate }, ... ]
    const promotions = await promotionService.getAllPromotions();
    res.status(200).json(promotions);
  } catch (err) {
    next(err);
  }
};

// Retrieve a specific promotion by ID
// GET /api/promotions/:promotionId
exports.getPromotionById = async (req, res, next) => {
  try {
    const { promotionId } = req.params;

    if (!promotionId) {
      return res.status(400).json({ message: 'promotionId parameter is required.' });
    }

    // promotionService.getPromotionById should:
    // 1) Fetch promotion record from DB or static source by the given ID
    // 2) Return null if not found or the promotion object if found
    const promotion = await promotionService.getPromotionById(promotionId);

    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found.' });
    }

    res.status(200).json(promotion);
  } catch (err) {
    next(err);
  }
};
