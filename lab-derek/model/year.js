'use strict';

const mongoose = require('mongoose');

const yearSchema = mongoose.Schema({
  name: {type: Number, require: true, unique: true},
  days: [{type: mongoose.Schema.Types.ObjectId, ref: 'day'}],
  dayJan1: {type: String, require: true, match: /sun/||/mon/||/tue/||/wed/||/thu/||/fri/||/sat/},
});

module.exports = mongoose.model('year', yearSchema);
