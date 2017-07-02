'use strict';

const mongoose = require('mongoose');

const issueSchema = mongoose.Schema({
  building: {type: String, required: true},
  room: {type: Number, required: true},
  type: [{type: mongoose.Schema.Types.ObjectId, ref: 'issue'}],
  // timestamp: {type: Date, default: Date.now},

});

module.exports = mongoose.model('issue', issueSchema);
