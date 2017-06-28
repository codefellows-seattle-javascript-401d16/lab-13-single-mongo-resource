'use strict';

const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  // team: {type: mongoose.Schema.Types.ObjectId},
  position: {type: String, required: true, maxlength: 2},
  active: {type: Boolean, default: true},
  injured: {type: Boolean, default: false},
});

module.exports = mongoose.model('player', playerSchema);
