'use strict';

const mongoose = require('mongoose');

const trailSchema = mongoose.Schema({
  name: {type: String, required: true, min: 1},
  resort: {type: mongoose.Schema.Types.ObjectId, ref:'resort'},
});

module.exports = mongoose.model('trail', trailSchema);
