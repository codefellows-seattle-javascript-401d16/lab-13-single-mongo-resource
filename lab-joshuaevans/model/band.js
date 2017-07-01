'use strict';

const mongoose = require('mongoose');

const bandSchema = mongoose.Schema({
  name: {type: String, required: true},
  numOfMembers: {type: Number, required: true},
  members: [{type: mongoose.Schema.Types.ObjectId , ref: 'member'}],
  created: {type: Date, default: new Date, required: true},
});

module.exports = mongoose.model('band', bandSchema);
