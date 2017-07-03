'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env` });

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockPhotoAlbum = require('./lib/mock-album.js');

let tempPhotoAlbum;
const API_URL = process.env.API_URL;

describe('testing /api/albums', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/albums', () => {
    let data = {
      userName: 'cat',
      albumName: faker.random.word(1)
    };
    it('should respond with an album', () => {
      return superagent.post(`${API_URL}/api/albums`).send(data).then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.userName).toEqual(data.userName);
        expect(res.body.albumName).toEqual(data.albumName);
        expect(res.body._id).toExist();
      });
    });

    it('should respond with status 400 bad request body ', () => {
      return superagent.post(`${API_URL}/api/albums`).send(null).catch(err => {
        expect(err.status).toEqual(400);
      });
    });

    it('should respond with status 409', () => {
      return superagent.post(`${API_URL}/api/albums`).send(data).catch(err => {
        expect(err.status).toEqual(409);
      });
    });
  });

  describe('testing GET /api/albums/:id', () => {
    it('should respond with an album', () => {
      let tempPhotoAlbum;
      return mockPhotoAlbum
        .createOne()
        .then(album => {
          tempPhotoAlbum = album;
          return superagent.get(`${API_URL}/api/albums/${album._id}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.userName).toEqual(tempPhotoAlbum.userName);
          expect(res.body.albumName).toEqual(tempPhotoAlbum.albumName);
          expect(res.body._id).toExist();
        });
    });
  });

  it('should respond with a an array of photos', () => {
    let tempPhotoAlbums;
    return mockPhotoAlbum
      .createMany(10)
      .then(albums => {
        tempPhotoAlbums = albums;
        return superagent.get(`${API_URL}/api/albums?page=2`);
      })
      .then(res => {
        expect(res.status).toEqual(200);
        res.body.forEach(album => {
          expect(album._id).toExist();
          expect(album.photo).toEqual([]);
          expect(album.userName).toExist();
        });
      });
  });

  it('should respond with 404 not found', () => {
    let tempPhotoAlbums;
    return mockPhotoAlbum
      .createMany(10)
      .then(albums => {
        tempPhotoAlbums = albums;
        return superagent.get(`${API_URL}/api/albums/123`);
      })
      .catch(err => {
        expect(err.status).toEqual(404);
      });
  });

  describe('testing PUT /api/albums/:id', () => {
    it('should respond with the updated album', () => {
      let tempPhotoAlbum;
      return mockPhotoAlbum
        .createOne()
        .then(album => {
          tempPhotoAlbum = album;
          return superagent
            .put(`${API_URL}/api/photos/${tempPhotoAlbum._id}`)
            .send({ name: 'cats' });
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('cats');
        });
    });

    it('should respond with status 400 invalid body', () => {
      let tempPhotoAlbum;
      return mockPhotoAlbum
        .createOne()
        .then(album => {
          tempPhotoAlbum = album;
          return superagent
            .put(`${API_URL}/api/photos/${tempPhotoAlbum._id}`)
            .send(null);
        })
        .catch(err => {
          expect(err.status).toEqual(400);
        });
    });

    it('should respond with status 404 not found', () => {
      let tempPhotoAlbum;
      return mockPhotoAlbum
        .createOne()
        .then(album => {
          tempPhotoAlbum = album;
          return superagent
            .put(`${API_URL}/api/photos/123`)
            .send({ name: 'bird' });
        })
        .catch(err => {
          expect(err.status).toEqual(404);
        });
    });
  });

  describe('testing DELETE /api/albums/:id', () => {
    it('should respond with status 204 - deleted', () => {
      let tempPhotoAlbum;
      return mockPhotoAlbum
        .createOne()
        .then(album => {
          tempPhotoAlbum = album;
          return superagent.delete(`${API_URL}/api/albums/${album._id}`);
        })
        .then(res => {
          expect(res.status).toEqual(204);
        });
    });
  });

  it('should respond with status 404 bad request', () => {
    let tempPhotoAlbum;
    return mockPhotoAlbum
      .createOne()
      .then(album => {
        tempPhotoAlbum = album;
        return superagent.get(`${API_URL}/api/albums/123`);
      })
      .catch(err => {
        expect(err.status).toEqual(404);
      });
  });
});
