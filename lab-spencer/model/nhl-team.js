'use strict';

const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  players: [{type: mongoose.Schema.Types.ObjectId, ref: 'player'}],
  wins: {type: Number, default: 0},
  losses: {type: Number, default: 0},
  ties: {type: Number, default: 0},
  lastUpdated: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('team', teamSchema);
