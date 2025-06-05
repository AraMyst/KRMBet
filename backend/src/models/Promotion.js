const mongoose = require('mongoose');

const { Schema, model } = mongoose;

/**
 * Promotion schema represents marketing promotions or bonuses available on the site.
 * - title: short, descriptive title of the promotion
 * - description: detailed explanation of the promotion
 * - bannerUrl: URL to an image/banner representing the promotion
 * - startDate: when the promotion becomes active
 * - endDate: when the promotion expires
 * - isActive: boolean flag, true when current date is between startDate and endDate
 */
const promotionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bannerUrl: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

// Pre-save middleware to update isActive based on current date
promotionSchema.pre('save', function (next) {
  const now = new Date();
  this.isActive = now >= this.startDate && now <= this.endDate;
  next();
});

module.exports = model('Promotion', promotionSchema);
