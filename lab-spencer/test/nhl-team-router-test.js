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
  afterEach(clearDB);

  describe('POST', () => {
    it('Should respond 200 with the character', () => {
      return mockTeam.createOne()
        .then(team => {
          clearDB();
          console.log(typeof team.lastUpdated);
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
              expect(res.body.lastUpdated).toBeA('string');
              expect(new Date(res.body.lastUpdated)).toNotBe('Invalid Date');
              expect(new Date(res.body.lastUpdated).getTime()).toBeLessThan(Date.now());
            });
        });
    });
  //   it('Should respond 400', () => {
  //     return superagent.post(`${API_URL}/api/nhl/teams`)
  //       .catch(res => {
  //         expect(res.status).toEqual(400);
  //       });
  //   });
  //   it('Should respond 400', () => {
  //     return superagent.post(`${API_URL}/api/nhl/teams`)
  //       .send({age: 33})
  //       .catch(res => {
  //         expect(res.status).toEqual(400);
  //       });
  //   });
  //   it('Should respond 409', () => {
  //     return superagent.post(`${API_URL}/api/nhl/teams`)
  //       .send(data)
  //       .catch(res => {
  //         expect(res.status).toEqual(409);
  //       });
  //   });
  // });
  // describe('GET', () => {
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
  //   it('Should respond 200 with all of the characters', () => {
  //     return superagent.get(`${API_URL}/api/nhl/teams`)
  //       .then(res => {
  //         expect(res.status).toEqual(200);
  //         expect(res.body).toBeAn(Array);
  //       });
  //   });
  //   it('Should respond 200 with a character', () => {
  //     return superagent.get(`${API_URL}/api/nhl/teams/${tempCharacter._id}`)
  //       .then(res => {
  //         expect(res.status).toEqual(200);
  //         expect(res.body).toMatch({
  //           _id: /^[a-f\d]{24}$/i,
  //           name: 'Bill Fill',
  //           age: 55,
  //           class: 'Bard',
  //           primaryProfession: 'Blacksmithing',
  //           secondaryProfession: 'Alchemy',
  //         });
  //       });
  //   });
  //   it('Should respond 404', () => {
  //     return superagent.get(`${API_URL}/api/nhl/teams/afasfasfsadasd`)
  //       .catch(res => {
  //         expect(res.status).toEqual(404);
  //       });
  //   });
  // });
  //
  // describe('PUT', () => {
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
  //   it('Should respond 200 with the updated character', () => {
  //     return superagent.put(`${API_URL}/api/nhl/teams/${tempCharacter._id}`)
  //       .send({age: 99})
  //       .then(res => {
  //         expect(res.status).toEqual(200);
  //         tempCharacter.age = 99;
  //         expect(res.body).toMatch({
  //           _id: /^[a-f\d]{24}$/i,
  //           name: 'Bill Fill',
  //           age: 55,
  //           class: 'Bard',
  //           primaryProfession: 'Blacksmithing',
  //           secondaryProfession: 'Alchemy',
  //         });
  //       });
  //   });
  // });
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
  });
});
