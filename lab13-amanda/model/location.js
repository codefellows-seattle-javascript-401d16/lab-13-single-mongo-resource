'use strict';
const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
  location: {location: String, required: true, unique: true},
  location: [{location: mongoose.Schema.Type.ObjectId, ref: 'task'}],
});

module.exports = mongoose.model('location', listSchema);
