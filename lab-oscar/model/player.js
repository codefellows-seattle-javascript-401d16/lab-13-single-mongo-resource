'use strict';

const mongoose = require('mongoose');
const Team = require('./team.js');

const playerSchema = mongoose.Schema({
  name: {type: String, require: true},
  age: {type: Number},
  position: {type: String},
  team: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'team'},
});

playerSchema.pre('save', function(next){
  console.log('pre save doc', this);
  Team.findById(this.team)
    .then(team => {
      let playerIDSet = new Set(team.players);
      playerIDSet.add(this._id);
      team.players = Array.from(playerIDSet);
      return team.save();
    })
    .then(() => next())
    .catch(() =>
      next(new Error('validation failed, not team for player')));
});

playerSchema.post('remove', function(doc, next){
  console.log('post remove doc', doc);
  Team.findById(doc.team)
    .then(team => {
      team.players = team.players.filter(player => player._id !== doc._id);
      return team.save();
    })
    .then(() => next())
    .catch(next);
});

module.exports = mongoose.model('player', playerSchema);


// // hooks go here
// taskSchema.pre('save', function(next) {
//   console.log('pre save doc', this)
//   List.findById(this.list)
//   .then(list => {
//     let taskIDSet = new Set(list.tasks)
//     taskIDSet.add(this._id)
//     list.tasks = Array.from(taskIDSet)
//     return list.save()
//   })
//   .then(() => next())
//   .catch(() =>
//     next(new Error('validation failed to create task because list does not exist')))
// })

//taskSchema.post('save', function(doc, next) {
  //console.log('post save doc', doc)
  //List.findById(doc.list)
  //.then(list => {
    //list.tasks.push(doc._id)
    //return list.save()
  //})
  //.then(() => next())
  //.catch(next)
//})

// taskSchema.post('remove', function(doc, next){
//   console.log('post remove doc', doc)
//   List.findById(doc.list)
//   .then(list => {
//     list.tasks = list.tasks.filter(task => task._id !== doc._id)
//     return list.save()
//   })
//   .then(() => next())
//   .catch(next)
// })
//
//
// module.exports = mongoose.model('task', taskSchema)
