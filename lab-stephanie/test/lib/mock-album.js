'use strict';

const faker = require('faker');
const PhotoAlbum = require('../../model/photo-album.js');

const mockPhotoAlbum = (module.exports = {});

mockPhotoAlbum.createOne = () => {
  return new PhotoAlbum({
    userName: faker.random.word(1),
    albumName: faker.random.word(1),
    pictures: faker.random.image(3)
  }).save();
};

mockPhotoAlbum.createMany = n => {
  let mockPhotoAlbumArray = new Array(n)
    .fill(0)
    .map(() => mockPhotoAlbum.createOne());
  return Promise.all(mockPhotoAlbumArray);
};
