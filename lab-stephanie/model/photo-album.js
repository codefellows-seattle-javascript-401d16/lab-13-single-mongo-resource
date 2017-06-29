'use strict';

const mongoose = require('mongoose');

const photoAlbumSchema = mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  albumName: { type: String, required: true, unique: true },
  picture: [{ type: mongoose.Schema.Types.ObjectId, ref: 'image' }]
});

module.exports = mongoose.model('PhotoAlbum', photoAlbumSchema);
