'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');
const Band = require('../model/band.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempBand;

describe('testing band routes', () => {
  before(server.start);
  after(server.stop);

  describe('testing post requests to /api/bands/', () => {
    after(() => Band.remove({}));

    let data = {
      name: 'kraftwerk',
      numOfMembers: 4,
    };
    it('should respond with a new band', () => {
      return superagent.post(`${API_URL}/api/bands`)
      .send(data)
      .then(res => {
        expect(res.status).toEqual(200);
      });
    });
    it('should return a 400 because invalid body in request', () => {
      return superagent.post(`${API_URL}/api/bands`)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('should return a 409 because data is not unique', () => {
      return superagent.post(`${API_URL}/api/bands`)
      .send(data)
      .catch(res => {
        expect(res.status).toEqual(409);
      });
    });
  });

  describe('testing get requests to /api/bands/', () => {
    var tempBand;
    afterEach(() => Band.remove({}));
    beforeEach(() => {
      return new Band({
        name: 'the beatles',
        numOfMembers: 4,
      })
      .save()
      .then(res => {
        tempBand = res;
      });
    });
    it('should respond with a 404, not found for requests not found', () => {
      return superagent.get(`${API_URL}/api/bands/${tempBand._id}`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
    it('should respond with a new band and 200 code', () => {
      return superagent.get(`${API_URL}/api/bands/${tempBand._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
      });
    });
  });

  describe('testing put requests to /api/bands', () => {
    afterEach(() => Band.remove({}));
    beforeEach(() => {
      return new Band ({
        name: 'the replacements',
        numOfMembers: 4,
      })
      .save()
      .then(res => {
        tempBand = res;
      });
    });
    it('should return a 200 and update the band with correct passed info', () => {
      return superagent.put(`${API_URL}/api/bands/${tempBand._id}`)
      .send({name: 'the rose garden', numOfMembers: 55})
      .then(res => {
        expect(res.status).toEqual(200);
      });
    });
    it('should return a 400 for a bad request if the body is invalid', () => {
      return superagent.put(`${API_URL}/api/bands/${tempBand._id}`)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('should return a 404 for a not found if doesnt exist', () => {
      return superagent.put(`${API_URL}/api/bands/78787878787`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });

  describe('testing DELETE /api/bands/:id', () => {
    afterEach(() => Band.remove({}));
    beforeEach(() => {
      return new Band({
        name: 'oingo boingo',
        numOfMembers: 5,
      })
      .save()
      .then(band => {
        tempBand = band;
      });
    });

    it('should delete the band and return a 204', () => {
      console.log('tempNote', tempBand);
      return superagent.delete(`${API_URL}/api/bands/${tempBand._id}`)
      .then(res => {
        expect(res.status).toEqual(204);
      });
    });
    it('should return a 404 for not found', () => {
      return superagent.delete(`${API_URL}/api/bands/${tempBand._id}`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });
});
