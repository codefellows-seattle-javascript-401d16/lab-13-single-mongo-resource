'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

const clearDB = require('./lib/clear-db.js');
const server = require('../lib/server.js');
const Team = require('../model/nhl-team.js');
const mockTeam = require('./lib/mock-nhl-team.js');
const mockPlayer = require('./lib/mock-nhl-player.js');

const API_URL = process.env.API_URL;

describe('testing /api/nhl/players', () => {
  before(server.start);
  after(server.stop);

  describe('testing POST /api/nhl/players', () => {
    after(clearDB);
    let tempTeam, tempPlayer;
    it('should create a player', () => {
      return mockTeam.createOne()
        .then(team => {
          tempTeam = team;
          return superagent.post(`${API_URL}/api/nhl/players`)
            .send({
              name: 'Spencer Gietzen',
              team: tempTeam._id,
              position: 'LW',
              injured: false,
            });
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual('Spencer Gietzen');
          expect(res.body.team).toEqual(tempTeam._id);
          expect(res.body.position).toEqual('LW');
          expect(res.body.injured).toEqual(false);
          tempPlayer = res.body;
          return Team.findById(tempPlayer.team);
        })
        .then(team => {
          expect(team.players.length).toEqual(1);
          expect(team.players[0].toString()).toEqual(tempPlayer._id.toString());
        });
    });

    it('should return 400', () => {
      return mockTeam.createOne()
        .then(team => {
          tempTeam = team;
          return superagent.post(`${API_URL}/api/nhl/players`)
            .send({
              name: 'Spencer Giet',
              team: 4,
              position: 'G',
              injured: false,
            });
        })
        .then(res => {
          throw res;
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('Should respond 409', () => {
      return superagent.post(`${API_URL}/api/nhl/players`)
        .send(tempPlayer)
        .then(res => {
          throw res;
        })
        .catch(res => {
          expect(res.status).toEqual(409);
        });
    });
  });

  describe('testing PUT /api/nhl/players', () => {
    after(clearDB);
    let tempTeam, tempPlayer;
    it('should respond 200 with updated player', () => {
      return mockPlayer.createOne()
        .then(({team, player}) => {
          tempPlayer = player;
          tempTeam = team;
          return superagent.put(`${API_URL}/api/nhl/players/${tempPlayer._id.toString()}`)
            .send({position: 'SR'});
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.position).toEqual('SR');
          expect(res.body._id.toString()).toEqual(tempPlayer._id.toString());
          expect(res.body.team.toString()).toEqual(tempTeam._id.toString());
          return Team.findById(tempTeam._id);
        })
        .then(team => {
          expect(team.players.length).toEqual(1);
          expect(team.players[0].toString()).toEqual(tempPlayer._id.toString());
        });
    });
    it('should respond 400', () => {
      return mockPlayer.createOne()
        .then(({team, player}) => {
          tempPlayer = player;
          tempTeam = team;
          return superagent.put(`${API_URL}/api/nhl/players/${tempPlayer._id.toString()}`)
            .send({position: 'adasdasd dasdasd'});
        })
        .then(res => {
          throw res;
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('should respond 404', () => {
      return mockPlayer.createOne()
        .then(({team, player}) => {
          tempPlayer = player;
          tempTeam = team;
          return superagent.put(`${API_URL}/api/nhl/players/asdsadasdasdsdsad`)
            .send({position: 'AA'});
        })
        .then(res => {
          throw res;
        })
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('testing GET /api/nhl/players', () => {
    after(clearDB);
    let tempPlayer;

    it('Should respond 200 with a player', () => {
      return mockPlayer.createOne()
        .then(result => {
          tempPlayer = result.player;
          return superagent.get(`${API_URL}/api/nhl/players/${tempPlayer._id.toString()}`)
            .then(res => {
              expect(res.status).toEqual(200);
              expect(res.body._id).toExist();
              expect(res.body.name).toEqual(tempPlayer.name);
              expect(res.body.team).toEqual(tempPlayer.team);
              expect(res.body.position).toEqual(tempPlayer.position);
              expect(res.body.injured).toEqual(tempPlayer.injured);
              expect(new Date(res.body.lastUpdated)).toEqual(tempPlayer.lastUpdated);
            });
        });
    });
    it('Should respond 404', () => {
      return superagent.get(`${API_URL}/api/nhl/teams/afasfasfsadasd`)
        .then(res => {
          throw res;
        })
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('testing DELETE /api/nhl/players', () => {
    after(clearDB);
    let tempPlayer;

    it('Should respond 204', () => {
      return mockPlayer.createOne()
        .then(result => {
          tempPlayer = result.player;
          return superagent.delete(`${API_URL}/api/nhl/players/${tempPlayer._id.toString()}`)
            .then(res => {
              expect(res.status).toEqual(204);
            });
        });
    });
    it('Should respond 404', () => {
      return superagent.delete(`${API_URL}/api/nhl/teams/afasfasfsadasd`)
        .then(res => {
          throw res;
        })
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
});
