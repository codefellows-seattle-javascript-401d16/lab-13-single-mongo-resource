'use stricts';

const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  owner: {type: String},
  founded: {type: String, minlength: 5 },
  players: [{type: mongoose.Schema.Types.ObjectId, ref: 'player'}],
});

module.exports = mongoose.model('team', teamSchema);
