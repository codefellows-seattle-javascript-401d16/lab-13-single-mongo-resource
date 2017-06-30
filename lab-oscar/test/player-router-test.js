'use strit';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

const clearDB = require('./lib/clear-db.js');
const server = require('../lib/server.js');
const Team = require('../model/team.js');
const mockTeam = require('./lib/mock-team.js');
const mockPlayer = require('./lib/mock-player.js');

const API_URL = process.env.API_URL;

describe('testing /api/players', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/players', () => {
    it('should create a player', () => {
      let tempTeam, tempPlayer;
      return mockTeam.createOne()
        .then(team => {
          tempTeam = team;
          return superagent.post(`${API_URL}/api/players`)
            .send({name: 'Oscar', age: 32, position: 'forward', team: team._id.toString(),
            });
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual('Oscar');
          expect(res.body.team).toEqual(tempTeam._id.toString());
          tempPlayer = res.body;
          return Team.findById(tempTeam._id);
        })
        .then(team => {
          expect(team.players.length).toEqual(1);
          expect(team.players[0].toString()).toEqual(tempPlayer._id.toString());
        });
    });
    it('should respond with a 400 for an invalid team id', () => {
      return superagent.post(`${API_URL}/api/players`)
        .send({name: 'new player', age: 45, position: 'defend', team: '25049572049835703984'})
        .then(res => {throw res})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });
  describe('testing GET /api/players/:id', () => {
    it('should respond with a player', () => {
      let tempTeam, tempPlayer;
      return mockPlayer.createOne()
        .then(({team, player}) => {
          tempPlayer = player;
          tempTeam = team;
          return superagent.get(`${API_URL}/api/players/${tempPlayer._id.toString()}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual(tempPlayer.name);
          expect(res.body._id).toEqual(tempPlayer._id);
          return Team.findById(tempTeam._id);
        })
        .then(team => {
          expect(team.players.length).toEqual(1);
          expect(team.players[0].toString()).toEqual(tempPlayer._id.toString());
        });
    });
    it('should respond with code 404', () => {
      return superagent.get(`${API_URL}/api/players/802983475`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
  describe('testing PUT /api/players/:id', () => {
    it('should respond with the updated player', () => {
      let tempTeam, tempPlayer;
      return mockPlayer.createOne()
        .then(({team, player}) => {
          tempPlayer = player;
          tempTeam = team;
          return superagent.put(`${API_URL}/api/players/${tempPlayer._id.toString()}`)
            .send({age: 40});
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.age).toEqual(40);
          expect(res.body._id).toEqual(tempPlayer._id);
          return Team.findById(tempTeam._id);
        })
        .then(team => {
          expect(team.players.length).toEqual(1);
          expect(team.players[0].toString()).toEqual(tempPlayer._id.toString());
        });
    });
    it('should respond with code 400', () => {
      return superagent.put(`${API_URL}/api/players/28574087`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
  describe('testing DELETE /api/players/:id', () => {
    it('should respond with 200', () => {
      let tempTeam, tempPlayer;
      return mockPlayer.createOne()
        .then(({team, player}) => {
          tempPlayer = player;
          tempTeam = team;
          return superagent.delete(`${API_URL}/api/players/${tempPlayer._id.toString()}`);
        })
        .then(res => {
          expect(res.status).toEqual(204);
          expect(res.body).toEqual({});
        });
    });
    it('should respond with 404', () => {
      return superagent.delete(`${API_URL}/api/players/098572483597`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
});
