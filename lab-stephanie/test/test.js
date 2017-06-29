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
      userName: faker.random.word(1),
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

  describe('testing GET /api/albums', () => {
    it('should respond with a an array of pictures', () => {
      let tempPhotoAlbums;
      return mockPhotoAlbum
        .createMany(20)
        .then(albums => {
          tempPhotoAlbums = albums;
          return superagent.get(`${API_URL}/api/albums?page=1`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          res.body.forEach(album => {
            expect(album._id).toExist();
            expect(album.pictures).toEqual([]);
            expect(album.userName).toExist();
          });
        });
    });

    it('should respond with a an array of pictures', () => {
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
            expect(album.pictures).toEqual([]);
            expect(album.userName).toExist();
          });
        });
    });

    it('should respond with a an array of pictures', () => {
      let tempPhotoAlbums;
      return mockPhotoAlbum
        .createMany(10)
        .then(albums => {
          tempPhotoAlbums = albums;
          return superagent.get(`${API_URL}/api/albums?page=3`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
  });
});
