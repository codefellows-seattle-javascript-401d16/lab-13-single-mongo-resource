'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const Loc = require('../model/loc.js');
const mockLoc = require('./lib/mock-loc.js');

let tempLoc;
const API_URL = process.env.API_URL;

describe('testing /api/locs', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/locs', () => {
    let data = {title: faker.name.title()};
    it('should respond with a loc', () => {
      return superagent.post(`${API_URL}/api/locs`)
      .send(data)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual(data.title);
        expect(res.body.tasks).toEqual([]);
        expect(res.body._id).toExist();
        tempLoc = res.body;
      });
    });
    it('should respond with a 400', () => {
      return superagent.post(`${API_URL}/api/locs`)
      .send({})
      .catch(err => {
        expect(err.status).toEqual(400);
      });
    });
    it('should respond with a 409', () => {
      let tempLoc;
      return mockLoc.createOne()
      .then(loc => {
        tempLoc = loc;
        return superagent.post(`${API_URL}/api/locs`)
        .send(tempLoc);
      })
      .then(res => {throw res;})
      .catch(res => {
        expect(res.status).toEqual(409);
      });
    });
  });

  describe('testing GET /api/locs/:id', () => {
    it('should respond with a loc', () => {
      let tempLoc;
      return mockLoc.createOne()
      .then(loc => {
        tempLoc = loc;
        return superagent.get(`${API_URL}/api/locs/${loc._id}`);
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual(tempLoc.title);
        expect(res.body.tasks).toEqual([]);
        expect(res.body._id).toExist();
      });
    });
  });

  describe('testing PUT /api/locs/:id', () => {
    it('should respond with an updated loc', () => {
      let tempLoc;
      return mockLoc.createOne()
    .then(loc => {
      tempLoc = loc;
      console.log('tempLoc', tempLoc);
      return  superagent.put(`${API_URL}/api/locs/${tempLoc._id.toString()}`)
      .send({title: 'puttest'});
    })
    .then(res => {
      expect(res.status).toEqual(200);
      expect(res.body.title).toEqual('puttest');
      expect(res.body.tasks).toEqual([]);
      expect(res.body._id).toEqual(tempLoc._id);
      return Loc.findById(tempLoc._id);
    });
    });
    it('should respond with a 400', () => {
      return mockLoc.createOne()
      .then(loc => {
        tempLoc = loc;
        return superagent.put(`${API_URL}/api/locs/${tempLoc._id.toString()}`)
        .send({});
      })
      .then(res => {throw res;})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('should respond with a 404', () => {
      return mockLoc.createOne()
      .then(loc => {
        tempLoc = loc;
        return superagent.put(`${API_URL}/api/locs/12345}`)
        .send({title:'unfound'});
      })
      .then(res => {
        throw res;
      })
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });

    describe('testing DELETE', () => {
      after(clearDB);
      let tempLoc;
      it('should result in a 204', () => {
        return mockLoc.createOne()
        .then(result => {
          tempLoc = result;
          return superagent.delete(`${API_URL}/api/locs/${tempLoc._id}`)
          .then(res => {
            expect(res.status).toEqual(204);
          });
        });
      });
      it('should respond with a 404', () => {
        return mockLoc.createOne()
            .then(loc => {
              tempLoc = loc;
              return superagent.delete(`${API_URL}/api/locs/12345}`);
            })
              .then(res => {
                throw res;
              })
          .catch(res => {
            expect(res.status).toEqual(404);
          });
      });
    });
  });
});
