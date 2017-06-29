'use strict';

const mongoose = require('mongoose');
const Team = require('./nhl-team.js');

const playerSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  team: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'team'},
  position: {type: String, required: true, maxlength: 2},
  injured: {type: Boolean, default: false},
  lastUpdated: {type: Date, default: Date.now()},
});

playerSchema.pre('save', function(next) {
  Team.findById(this.team)
    .then(() => next())
    .catch(() => next(new Error('Validation failed, failed to create player, team does not exist')));
});

playerSchema.post('save', function(doc, next) {
  Team.findById(doc.team)
    .then(team => {
      let playerIDSet = new Set(team.players);
      playerIDSet.add(this._id.toString());
      team.players = Array.from(playerIDSet);
      return team.save();
    })
    .then(() => next())
    .catch(next);
});

playerSchema.post('remove', function(doc, next) {
  Team.findById(doc.team)
    .then(team => {
      team.players = team.players.filter(player => player._id !== doc._id);
      return team.save();
    })
    .then(() => next)
    .catch(next);
});

module.exports = mongoose.model('player', playerSchema);
