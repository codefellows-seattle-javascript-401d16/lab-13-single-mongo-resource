'use strict';

const faker = require('faker');

const mockAlbum = require('./mock-album.js');
const Photo = require('../../model/photo.js');

const mockPhoto = (module.exports = {});

mockPhoto.createOne = () => {
  let result = {};
  return mockAlbum
    .createOne()
    .then(almbum => {
      result.almbum = almbum;
      return new Photo({
        name: faker.random.words(1),
        date: Date.now(),
        image: faker.random.word(1)
      }).save();
    })
    .then(photo => {
      result.photo = photo;
      return result;
    });
};

mockPhoto.createMany = n => {
  let result = {};
  return mockAlbum
    .createOne()
    .then(almbum => {
      result.almbum = almbum;
      let photoSavePromises = new Array(n).fill(0).map(() =>
        new Photo({
          name: faker.random.words(1),
          date: Date.now(),
          image: faker.random.word(1)
        }).save()
      );
      return Promise.all(photoSavePromises);
    })
    .then(photos => {
      result.photos = photos;
      return result;
    });
};
