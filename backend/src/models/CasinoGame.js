const mongoose = require('mongoose');

const { Schema, model } = mongoose;

/**
 * CasinoGame schema represents a single casino game (e.g., roulette, blackjack, slots).
 * - title: human-readable name of the game.
 * - thumbnailUrl: URL to a thumbnail image representing the game.
 * - description: short description of the game.
 * - config: arbitrary configuration object (e.g., reel settings, deck info).
 * - assets: object containing asset URLs (e.g., spinnerImage, cardSprites).
 */
const casinoGameSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  playUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  config: {
    type: Schema.Types.Mixed,
    default: {},
  },
  assets: {
    type: Schema.Types.Mixed,
    default: {},
  },
});

module.exports = model('CasinoGame', casinoGameSchema);
