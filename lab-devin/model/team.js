'use strict';

const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  country: {type: String, required: true},
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'member'}],
});

module.exports = mongoose.model('team', teamSchema);
