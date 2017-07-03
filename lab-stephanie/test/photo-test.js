'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env` });

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');

const clearDB = require('./lib/clear-db');
const server = require('../lib/server.js');
const Album = require('../model/album.js');
const mockAlbum = require('./lib/mock-album.js');
const mockPhoto = require('./lib/mock-photos.js');

const API_URL = process.env.API_URL;

describe('testing /api/photos', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/photos', () => {
    it('should create a photo', () => {
      let tempAlbum;
      let tempPhoto;
      return mockAlbum
        .createOne()
        .then(photo => {
          tempAlbum = photo;
          return superagent.post(`${API_URL}/api/photos`).send({
            name: 'beach',
            date: Date.now(),
            image: faker.random.word(1)
          });
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          tempPhoto = res.body;
          return Album.findById(tempAlbum._id);
        })
        .then(photo => {
          expect(photo.image.length).toEqual(1);
        });
    });

    it('should respond with a 400 for having a bad id ', () => {
      return superagent
        .post(`${API_URL}/api/photos`)
        .send({
          name: faker.random.word(1),
          date: Date.now(),
          image: faker.random.image(1)
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    it('should respond with status 409', () => {
      return superagent
        .post(`${API_URL}/api/photos`)
        .send({
          name: 'beach',
          date: Date.now(),
          image: faker.random.image(1)
        })
        .catch(res => {
          expect(res.status).toEqual(409);
        });
    });
  });

  describe('testing PUT /api/photos/:id', () => {
    it('should respond with the updated photo', () => {
      let tempAlbum, tempPhoto;
      return mockPhoto
        .createOne()
        .then(({ photo, album }) => {
          tempPhoto = photo;
          tempAlbum = album;
          return superagent
            .put(`${API_URL}/api/photos/${tempPhoto._id}`)
            .send({ name: 'cats' });
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('cats');
          expect(res.body._id).toEqual(tempPhoto._id);
          return Album.findById(tempAlbum._id);
        })
        .then(photo => {
          expect(photo.image.length).toEqual(1);
        });
    });

    it('should respond with status 400 invalid request body', () => {
      let tempAlbum, tempPhoto;
      return mockPhoto
        .createOne()
        .then(({ photo, album }) => {
          tempPhoto = photo;
          tempAlbum = album;
          return superagent
            .put(`${API_URL}/api/photos/${tempPhoto._id}`)
            .send(null);
        })
        .catch(err => {
          expect(err.status).toEqual(400);
        });
    });

    it('should respond with status 404 not found', () => {
      let tempAlbum, tempPhoto;
      return mockPhoto
        .createOne()
        .then(({ photo, album }) => {
          tempPhoto = photo;
          tempAlbum = album;
          return superagent
            .put(`${API_URL}/api/photos/124`)
            .send({ name: 'cats' });
        })
        .catch(err => {
          expect(err.status).toEqual(404);
        });
    });
  });

  describe('testing GET /api/photos/:id', () => {
    it('should respond with a photo', () => {
      let tempAlbum, tempPhoto;
      return mockPhoto
        .createOne()
        .then(({ photo, album }) => {
          tempPhoto = photo;
          tempAlbum = album;
          return superagent.get(`${API_URL}/api/photos/${tempPhoto._id}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual(tempPhoto.name);
        });
    });

    it('should respond with status 404 not found', () => {
      let tempAlbum, tempPhoto;
      return mockPhoto
        .createOne()
        .then(({ photo, album }) => {
          tempPhoto = photo;
          tempAlbum = album;
          return superagent.get(`${API_URL}/api/photos/124`);
        })
        .catch(err => {
          expect(err.status).toEqual(404);
        });
    });
  });

  describe('testing DELETE /api/photos/:id', () => {
    it('should respond with status 204 -deleted', () => {
      let tempAlbum, tempPhoto;
      return mockPhoto
        .createOne()
        .then(({ photo, album }) => {
          tempPhoto = photo;
          tempAlbum = album;
          return superagent.delete(`${API_URL}/api/photos/${tempPhoto._id}`);
        })
        .then(res => {
          expect(res.status).toEqual(204);
        });
    });

    it('should respond with status 404 not found', () => {
      let tempAlbum, tempPhoto;
      return mockPhoto
        .createOne()
        .then(({ photo, album }) => {
          tempPhoto = photo;
          tempAlbum = album;
          return superagent.delete(`${API_URL}/api/photos/124`);
        })
        .catch(err => {
          expect(err.status).toEqual(404);
        });
    });
  });
});
