'use strict';

const mongoose = require('mongoose');
const Album = require('./album.js');

const photoSchema = mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, requires: true },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'photo'
  }
});

photoSchema.pre('save', function(next) {
  Album.findById(this.album)
    .then(album => {
      let photoIDSet = new Set(album.photo);
      photoIDSet.add(this._id);
      album.photo = Array.from(photoIDSet);
      return album.save();
    })
    .then(() => next())
    .catch(() => next(new Error('validation failed')));
});

photoSchema.post('remove', function(doc, next) {
  Album.findById(doc.album)
    .then(album => {
      album.photo = album.photo.filter(photo => photo._id !== doc._id);
      return album.save();
    })
    .then(() => next())
    .catch(next);
});

module.exports = mongoose.model('photo', photoSchema);
