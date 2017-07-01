'use strict';

const mongoose = require('mongoose');
const Band = require('./band.js');

const artistSchema = mongoose.Schema({
  name: {type: String, required: true},
  age: {type: Number, required: true},
  created: {type: Date, default: new Date, required: true},
  band: {},
});

artistSchema.pre('save', function(next) {
  console.log('pre hook save', this);
  Band.findById(this.band)
  .then(band => {
    let artistIdSet = new Set(band.tasks);
    artistIdSet.add(this._id);
    band.tasks = Array.from(artistIdSet);
    return band.save();
  })
  .then(() => next())
  .catch(() =>
    next(new Error('validation failed to create artist because band does not exist')));
});

module.exports = mongoose.model('artist', artistSchema);
