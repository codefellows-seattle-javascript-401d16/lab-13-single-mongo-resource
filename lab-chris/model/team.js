'use strict';

const mongoose = require('mongoose');
const Nation = require('./nation.js');

const teamSchema = mongoose.Schema({
  nation: [{type: mongoose.Schema.Types.ObjectId, ref: 'nation'}],
  name: {type: String, required: true, unique: true},
});

teamSchema.pre('save', function(next) {
  console.log('pre save doc', this);
  Nation.findById(this.nation)
  .then(nation => {
    let teamIDSet = new Set(nation.teams);
    teamIDSet.add(this._id);
    nation.teams = Array.from(teamIDSet);
    return nation.save();
  })
  .then(() => next())
  .catch(() =>
    next(new Error('validation failed to create team because nation does not exist')));
});

teamSchema.post('remove', function(doc, next){
  Nation.findById(doc.list)
  .then(list => {
    list.tasks = list.tasks.filter(task => task._id !== doc._id);
    return list.save();
  })
  .then(() => next())
  .catch(next);
});
module.exports = mongoose.model('team', teamSchema);
