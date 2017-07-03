'use strict';

const mongoose = require('mongoose');

const photoAlbumSchema = mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  albumName: { type: String, required: true, unique: true },
  photo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'photo' }]
});

module.exports = mongoose.model('PhotoAlbum', photoAlbumSchema);
