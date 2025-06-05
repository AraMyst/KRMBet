const mongoose = require('mongoose');

const { Schema, model } = mongoose;

/**
 * Event schema represents a sports event retrieved from Odds API.
 * - eventId: unique identifier from the external API.
 * - sportKey: key for the sport (e.g., 'soccer_epl').
 * - commenceTime: date/time when the event starts.
 * - homeTeam: name of the home team.
 * - awayTeam: name of the away team.
 */
const eventSchema = new Schema({
  eventId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  sportKey: {
    type: String,
    required: true,
  },
  commenceTime: {
    type: Date,
    required: true,
  },
  homeTeam: {
    type: String,
    required: true,
  },
  awayTeam: {
    type: String,
    required: true,
  },
});

module.exports = model('Event', eventSchema);
