'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockTeam = require('./lib/mock-nhl-team.js');
// const mockPlayer = require('./lib/mock-nhl-player.js');

const API_URL = process.env.API_URL;
let tempTeam;

describe('testing nonexistent endpoint', () => {
  before(server.start);
  after(server.stop);

  it('Should respond 404', () => {
    return superagent.get(`${API_URL}/dkasjdk`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
  });
});

describe('testing /api/nhl/teams routes', () => {
  before(server.start);
  after(server.stop);

  describe('POST', () => {
    after(clearDB);
    it('Should respond 200 with the posted team', () => {
      return mockTeam.createOne()
        .then(team => {
          clearDB(); // because createOne saves to DB
          tempTeam = team;
          tempTeam._id = undefined;
          return superagent.post(`${API_URL}/api/nhl/teams`)
            .send(team)
            .then(res => {
              expect(res.body._id).toMatch(/^[a-f\d]{24}$/i);
              expect(res.body.name).toEqual(team.name);
              expect(res.body.city).toEqual(team.city);
              expect(res.body.state).toEqual(team.state);
              expect(res.body.wins).toEqual(team.wins);
              expect(res.body.losses).toEqual(team.losses);
              expect(res.body.ties).toEqual(team.ties);
              expect(res.body.players).toEqual([]);
              expect(res.body.lastUpdated).toBeA('string');
              expect(new Date(res.body.lastUpdated)).toNotBe('Invalid Date');
              expect(new Date(res.body.lastUpdated).getTime()).toBeLessThan(Date.now());
            });
        });
    });
    it('Should respond 400', () => {
      return superagent.post(`${API_URL}/api/nhl/teams`)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('Should respond 400', () => {
      return superagent.post(`${API_URL}/api/nhl/teams`)
        .send({city: 'Hamilton'})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('Should respond 409', () => {
      return superagent.post(`${API_URL}/api/nhl/teams`)
        .send(tempTeam)
        .catch(res => {
          expect(res.status).toEqual(409);
        });
    });
  });
  describe('GET', () => {
    after(clearDB);

    // it('Should respond 200 with page 2 of 5 teams on each page', () => {
    //   mockTeam.createMany(20)
    //     .then(() => {
    //       return superagent.get(`${API_URL}/api/nhl/teams?pageNum=1&numPer=5`)
    //         .then(res => {
    //           expect(res.status).toEqual(200);
    //           expect(res.body).toBeAn(Array);
    //         });
    //     });
    // });
    it('Should respond 200 with a character', () => {
      return mockTeam.createOne()
        .then(team => {
          return superagent.get(`${API_URL}/api/nhl/teams/${team._id}`)
            .then(res => {
              expect(res.status).toEqual(200);
              expect(res.body._id).toEqual(team._id);
              expect(res.body.name).toEqual(team.name);
              expect(res.body.city).toEqual(team.city);
              expect(res.body.state).toEqual(team.state);
              expect(res.body.wins).toEqual(team.wins);
              expect(res.body.losses).toEqual(team.losses);
              expect(res.body.ties).toEqual(team.ties);
              expect(res.body.players).toEqual(team.players);
              expect(new Date(res.body.lastUpdated)).toEqual(team.lastUpdated);
            });
        });
    });
    it('Should respond 404', () => {
      return superagent.get(`${API_URL}/api/nhl/teams/afasfasfsadasd`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('PUT', () => {
    after(clearDB);

    it('Should respond 200 with the updated character', () => {
      return mockTeam.createOne()
        .then(createdTeam => {
          return superagent.put(`${API_URL}/api/nhl/teams/${createdTeam._id}`)
            .send({city: 'Mukilteo', state: 'Washington'})
            .then(() => {
              return superagent.get(`${API_URL}/api/nhl/teams/${createdTeam._id}`)
                .then(res => {
                  expect(res.status).toEqual(200);
                  expect(res.body._id).toEqual(createdTeam._id);
                  expect(res.body.name).toEqual(createdTeam.name);
                  expect(res.body.city).toEqual('Mukilteo');
                  expect(res.body.state).toEqual('Washington');
                  expect(res.body.wins).toEqual(createdTeam.wins);
                  expect(res.body.losses).toEqual(createdTeam.losses);
                  expect(res.body.ties).toEqual(createdTeam.ties);
                  expect(res.body.players).toEqual([]);
                  expect(res.body.lastUpdated).toBeA('string');
                  expect(new Date(res.body.lastUpdated)).toNotBe('Invalid Date');
                  expect(new Date(res.body.lastUpdated).getTime()).toBeLessThan(Date.now());
                });
            });
        });
    });
    it('Should respond 400', () => { // fix this
      return mockTeam.createOne()
        .then(createdTeam => {
          return superagent.put(`${API_URL}/api/nhl/teams/${createdTeam._id}`)
            .send('dsadsadas')
            .catch(res => {
              expect(res.status).toEqual(400);
            });
        });
    });
    it('Should respond 404', () => { // fix this{
      return superagent.put(`${API_URL}/api/nhl/teams/asdasdasdasdsa`)
        .send({city: 'Mukilteo', state: 'Washington'})
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
  //
  // describe('DELETE', () => {
  //   afterEach(() => Character.remove({}));
  //   beforeEach(() => {
  //     return new Character({
  //       name: 'Bill Fill',
  //       age: 55,
  //       class: 'Bard',
  //       primaryProfession: 'Blacksmithing',
  //       secondaryProfession: 'Alchemy',
  //     })
  //     .save()
  //     .then(character => {
  //       tempCharacter = character;
  //     });
  //   });
  //
  //   it('Should respond 204', () => {
  //     return superagent.delete(`${API_URL}/api/nhl/teams/${tempCharacter._id}`)
  //     .then(res => {
  //       expect(res.status).toEqual(204);
  //     });
  //   });
  //   it('Should respond 404', () => {
  //     return superagent.delete(`${API_URL}/api/nhl/teams/asdasdasdas`)
  //     .catch(res => {
  //       expect(res.status).toEqual(404);
  //     });
  //   });
  // });
});
