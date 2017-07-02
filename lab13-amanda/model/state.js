'use strict';

const mongoose = require('mongoose');
const Place = require('./place.js');

const stateSchema = mongoose.Schema({
  content: {type: String, required: true},
  place: {type: mongoose.Schema.Types.objectId, required: true, ref :'place'},
});

stateSchema.pre('save', function(next) {
  console.log('pre save doc', this);
  Place.findById(this.place)
  .then(place=> {
    let stateIDSet = new Set(place.states);
    stateIDSet.add(this._id);
    place.states = Array.from(stateIDSet);
    return place.save();
  })
.then(() => next())
.catch(() =>
  next(new Error('validation failed to create state because place does not exist')));
});

stateSchema.post('remove', function(doc, next){
  console.log('post remove doc', doc);
  Place.findById(doc.list)
  .then(place => {
    place.states = place.states.filter(state => state._id !==doc._id);
    return place.save();
  })
  .then(() => next())
  .catch(next);
});

module.exports = mongoose.model('state', stateSchema);
