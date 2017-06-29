'use strict';

const mongoose = require('mongoose');
const Nation = require('./nation.js');

const teamSchema = mongoose.Schema({
  nation: [{type: mongoose.Schema.Types.ObjectId, ref: 'nation'}],
  name: {type: String, required: true, unique: true},
  league: {type: String, required: true},
  titles: {type: String, required: true},
  players: {type: String, required: true},
});

teamSchema.pre('save', function(next){
  Nation.findById(this.nation)
  .then(() => next())
  .catich(() => next(new Error('failed to creae team because nation does not exist')));
});
teamSchema.post('save', function(doc, next){
  Nation.findById(doc.nation)
  .then(nation => {
    nation.team.push(doc._id);
    return nation.save();
  })
  .then(() => next())
  .catch(next);
});


module.exports = mongoose.model('team', teamSchema);
