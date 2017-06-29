'use strict';

const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  country: [{type: mongoose.Schema.Types.ObjectId, ref: 'country'}],
  name: {type: String, required: true, unique: true},
});

module.exports = mongoose.model('team', teamSchema);
