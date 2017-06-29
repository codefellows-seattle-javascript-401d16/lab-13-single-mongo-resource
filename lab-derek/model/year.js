'use strict';

const mongoose = require('mongoose');

const yearSchema = mongoose.Schema({
  name: {type: Number, require: true, unique: true},
  days: {type: mongoose.Schema.Types.Objectid, ref: 'day'},
  dayJan1: {type: String, require: true},
});

module.exports = mongoose.model('year', yearSchema);
