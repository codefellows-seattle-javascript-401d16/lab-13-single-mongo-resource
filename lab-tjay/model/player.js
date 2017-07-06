'use strict';

const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  playerName: {type:String, required: true},
  role: [{type: mongoose.Schema.Types.ObjectId, ref: 'role'}],
});

module.exports = mongoose.model('player', playerSchema);
