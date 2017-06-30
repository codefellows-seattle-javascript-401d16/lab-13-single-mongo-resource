'use strict';

const mongoose = require('mongoose');

const ResortSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true, min: 2},
  trails: [{type: mongoose.Schema.Types.ObjectId, ref: 'trail'}],
});

module.exports = mongoose.model('resort', ResortSchema);
