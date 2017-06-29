'use strict';

const mongoose = require('mongoose');

const leaderSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  submitted: {type: Date, default: Date.now, unique: true},
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'member'}],
});

module.exports = mongoose.model('leader', leaderSchema);
