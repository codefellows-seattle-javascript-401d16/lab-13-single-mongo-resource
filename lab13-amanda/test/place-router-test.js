'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const place= require('../model/place.js');
const mockplace= require('./lib/mock-place.js');

let tempplace;
const API_URL = process.env.API_URL;

describe('testing /api/places', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/places', () => {
    let data = {title: faker.name.title()};
    it('should respond with a place', () => {
      return superagent.post(`${API_URL}/api/places`)
      .send(data)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual(data.title);
        expect(res.body.states).toEqual([]);
        expect(res.body._id).toExist();
        tempplace= res.body;
      });
    });
    it('should respond with a 400', () => {
      return superagent.post(`${API_URL}/api/places`)
      .send({})
      .catch(err => {
        expect(err.status).toEqual(400);
      });
    });
    it('should respond with a 409', () => {
      let tempplace;
      return mockplace.createOne()
      .then(place=> {
        tempplace= place;
        return superagent.post(`${API_URL}/api/places`)
        .send(tempplace);
      })
      .then(res => {throw res;})
      .catch(res => {
        expect(res.status).toEqual(409);
      });
    });
  });

  describe('testing GET /api/places/:id', () => {
    it('should respond with a place', () => {
      let tempplace;
      return mockplace.createOne()
      .then(place => {
        tempplace = place;
        return superagent.get(`${API_URL}/api/places/${place._id}`);
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual(tempplace.title);
        expect(res.body.states).toEqual([]);
        expect(res.body._id).toExist();
      });
    });
  });

  describe('testing PUT /api/places/:id', () => {
    it('should respond with an updated place', () => {
      let tempplace;
      return mockplace.createOne()
    .then(place=> {
      tempplace= place;
      console.log('tempplace', tempplace);
      return  superagent.put(`${API_URL}/api/places/${tempplace._id.toString()}`)
      .send({title: 'puttest'});
    })
    .then(res => {
      expect(res.status).toEqual(200);
      expect(res.body.title).toEqual('puttest');
      expect(res.body.states).toEqual([]);
      expect(res.body._id).toEqual(tempplace._id);
      return place.findById(tempplace._id);
    });
    });
    it('should respond with a 400', () => {
      return mockplace.createOne()
      .then(place=> {
        tempplace= place;
        return superagent.put(`${API_URL}/api/places/${tempplace._id.toString()}`)
        .send({});
      })
      .then(res => {throw res;})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('should respond with a 404', () => {
      return mockplace.createOne()
      .then(place=> {
        tempplace= place;
        return superagent.put(`${API_URL}/api/places/12345}`)
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
      let tempplace;
      it('should result in a 204', () => {
        return mockplace.createOne()
        .then(result => {
          tempplace= result;
          return superagent.delete(`${API_URL}/api/places/${tempplace._id}`)
          .then(res => {
            expect(res.status).toEqual(204);
          });
        });
      });
      it('should respond with a 404', () => {
        return mockplace.createOne()
            .then(place=> {
              tempplace= place;
              return superagent.delete(`${API_URL}/api/places/12345}`);
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
