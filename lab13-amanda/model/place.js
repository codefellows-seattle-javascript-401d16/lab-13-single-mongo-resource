'use strict';

const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
  title: {type: String, required: true, unique: true},
  states: [{type: mongoose.Schema.Types.ObjectId, ref: 'state'}],

});

module.exports = mongoose.model('place', placeSchema);
