'use strict';

const mongoose = require('mongoose');
const Ship = require('./ship.js');

const crewSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true, minlength: 3},
  age: {type: Number, required: true},
  profession: {type: String, required: true},
  ship: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ship'},
  timestamp: {type: Date, default: Date.now},
});

crewSchema.pre('save', function(next) {
  console.log('pre save doc', this);
  Ship.findById(this.ship)
  .then(ship => {
    let crewIDSet = new Set(ship.crews);
    crewIDSet.add(this._id);
    ship.crews = Array.from(crewIDSet);
    return ship.save();
  })
  .then(() => next())
  .catch(() => next(new Error('validation failed to hire crew because ship does not exist')));
});

crewSchema.post('remove', function(doc, next) {
  console.log('post save doc', doc);
  Ship.findById(doc.ship)
  .then(ship => {
    ship.crews = ship.crews.filter(crew => crew._id !== doc._id);
    return ship.save();
  })
  .then(() => next())
  .catch(next);
});

module.exports = mongoose.model('crew', crewSchema);
