'use strict';

const mongoose = require('mongoose');

const redTeamSchema = mongoose.Schema({
  name: {type:String, required: true, unique: true},
  position: {type:String, required: true},
  activeSince: {type:Date, default: Date.now},
});

module.exports = mongoose.model('redTeam', redTeamSchema);
