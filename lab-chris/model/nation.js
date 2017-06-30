'use strict';

const mongoose = require('mongoose');

const nationSchema = mongoose.Schema({
  country: {type: String, required: true, unique: true},
  teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'team'}],
});

module.exports = mongoose.model('nation', nationSchema);
