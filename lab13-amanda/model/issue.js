'use strict';

const mongoose = require('mongoose');

const issueSchema = mongoose.Schema({
  building: {type: String, required: true},
  room: {type: Number, required: true},
  type: [{type: String, require: true, ref: 'issue'}],

});

module.exports = mongoose.model('issue', issueSchema);
