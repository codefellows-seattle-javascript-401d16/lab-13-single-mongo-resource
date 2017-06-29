'use strict';

const mongoose = require('mongoose');

const photoAlbumSchema = mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  albumName: { type: String, required: true, unique: true },
  pictures: [{ type: String, ref: 'image' }]
});

module.exports = mongoose.model('PhotoAlbum', photoAlbumSchema);
