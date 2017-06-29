'use strict';

const mongoose = require('mongoose');

const yearSchema = mongoose.Schema({
  name: {type: Number, require: true, unique: true},
  // months: {type: mongoose.Schema.Types.Objectid, ref: 'month'},
  dayJan1: {type: String, require: true},
});

module.exports = mongoose.model('year', yearSchema);
