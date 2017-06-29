'use strict';

const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  nation: [{type: mongoose.Schema.Types.ObjectId, ref: 'nation'}],
  name: {type: String, required: true, unique: true},
});

module.exports = mongoose.model('team', teamSchema);
