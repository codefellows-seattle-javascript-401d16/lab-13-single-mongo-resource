'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const Nation = require('../model/nation.js');
const mockNation = require('./lib/mock-nation.js');
const mockTeam = require('./lib/mock-team.js');

const API_URL = process.env.API_URL;

describe('testing /api/teams', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/teams', () => {
    it('should create a team', () => {
      let tempNation;
      let tempTeam ;
      return mockNation.createOne()
      .then(nation => {
        tempNation = nation;
        return superagent.post(`${API_URL}/api/teams`)
        .send({
          nation: nation._id.toString(),
          name: faker.random.words(),
        });
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.nation).toEqual(tempNation._id.toString());
        tempTeam = res.body;
        return Nation.findById(tempNation._id);
      })
      .then(nation => {
        expect(nation.teams.length).toEqual(1);
        expect(nation.teams[0].toString()).toEqual(tempTeam._id.toString());
      });
    });

    it('should respond with a 400 for having a bad nation id ', () => {
      return superagent.post(`${API_URL}/api/teams`)
      .send({
        nation: '595548f2d8e2edfd4f2ecc24',
      })
      .then(res => {throw res})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

    // it('should respond with a 409', () => {
    //   let tempNation;
    //   return mockNation.createOne()
    //   .then(nation => {
    //     tempNation = nation;
    //     return superagent.post(`${API_URL}/api/nations`)
    //     .send(tempNation);
    //   })
    //   .catch(res => {
    //     expect(res.status).toEqual(409);
    //   });
    // });
  });

  describe('testing PUT /api/teams/:id', () => {
    it('should respond with the updated team', () => {
      let tempNation, tempTeam;
      return mockTeam.createOne()
      .then(({nation, team}) => {
        tempTeam = team;
        tempNation = nation;
        return superagent.put(`${API_URL}/api/teams/${tempTeam._id.toString()}`)
        .send({
          nation: nation._id.toString(),
          name: 'Real Madrid',
        });
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual('Real Madrid');
        expect(res.body._id).toEqual(tempTeam._id);
        expect(res.body.nation).toEqual(tempNation._id);
        return Nation.findById(tempNation._id);
      })
      .then(nation => {
        expect(nation.teams.length).toEqual(1) ;
        expect(nation.teams[0].toString()).toEqual(tempTeam._id.toString());
      });
    });
  });
});
