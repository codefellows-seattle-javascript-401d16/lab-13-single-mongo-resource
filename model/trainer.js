'use strict';

const mongoose = require('mongoose');

const trainerSchema = mongoose.Schema({
  name: {type: String, required: true},
  plan: [{type: mongoose.Schema.Types.ObjectId, ref: 'plan'}],
});

module.exports = mongoose.model('trainer', trainerSchema);
