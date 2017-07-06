'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env` });

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');

const clearDB = require('./lib/clear-db.js');
const mockPlayer = require('./lib/mock-player.js');

let tempPlayer;
const API_URL = process.env.API_URL;

describe('testing player routes', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/player', () => {
    let data = {playerName: faker.player};
    console.log('data', data);

    it('should respond with a player', () => {
      return superagent.post(`${API_URL}/api/player`)
      .send(data)
      .then(res => {
        console.log('data', data);
        expect(res.status).toEqual(200);
        expect(res.body.playerName).toEqual(data.playerName);
        expect(res.body.products).toEqual([]);
        expect(res.body._id).toExist();
      });
    });

    it('should respond with 400 invalid request body', () => {
      return superagent.post(`${API_URL}/api/player`).send().catch(err => {
        expect(err.status).toEqual(400);
      });
    });
  });

  describe('testing GET /api/player', () => {
    it('should respond with a an array of 50 player', () => {
      return mockPlayer.createMany(100)
      .then(player => {
        tempPlayer = player;
        return superagent.get(`${API_URL}/api/player/${player._id}`);
      })
      .then(res => {
        console.log(res.body.map(list => list.playerName));
        expect(res.status).toEqual(200);
        expect(res.body.length).toEqual(50);
        res.body.forEach(list => {
          expect(list._id).toExist();
          expect(list.products).toEqual([]);
          expect(list.playerName).toExist();
        });
      });
    });
    describe('testing GET /api/player', () => {
      it('should respond with a player', () => {
        return superagent
          .get(`${API_URL}/api/player/${tempPlayer._id}`)
          .then(res => {
            expect(res.status).toEqual(200);
            expect(res.body._id).toExist();
            expect(res.body.name).toEqual('John Wick');
            expect(res.body.review).toEqual('A must watch player');
          });
      });
      it('should respond with a 404 not found', () => {
        return superagent.get(`${API_URL}/api/player/`).catch(err => {
          expect(err.status).toEqual(404);
        });
      });
    });

    describe('testing PUT /api/player', () => {
      it('should respond with a 200 and updated player', () => {
        return superagent
          .put(`${API_URL}/api/player/${tempPlayer._id}`)
          .send({
            name: 'John Wick 2',
            review: '2 thumbs up',
          })
          .then(res => {
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual('John Wick 2');
            expect(res.body.review).toEqual('2 thumbs up');
          });
      });
    });

    describe('testing DELETE /api/player', () => {
      it('should respond with a 200', () => {
        return superagent
          .delete(`${API_URL}/api/player/${tempPlayer._id}`)
          .then(res => {
            expect(res.status).toEqual(200);
            expect(res.body._id).toNotExist();
          });
      });
    });
  });


});
