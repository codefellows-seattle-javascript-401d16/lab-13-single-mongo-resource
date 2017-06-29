'use strict';

const mongoose = require('mongoose');

const shipSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true, minlength: 3},
  type: {type: String, required: true},
  captain: {type: String, required: true},
  crews: [{type: mongoose.Schema.Types.ObjectId, ref: 'crew'}],
  timestamp: {type: Date, default: Date.now},
});

const Ship = module.exports = mongoose.model('ship', shipSchema);
