'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockBikeShop = require('./lib/mock-bike-shop.js');

let tempShop;
const API_URL = process.env.API_URL;

describe('testing api/bikeShops', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST api/bikeShops', () => {

    it('should respond with a bike shop', () => {
      let data = {
        name: faker.company.companyName(),
        location:  faker.address.streetName(),
      };
      return superagent.post(`${API_URL}/api/bikeShops`)
      .send(data)
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual(data.name);
        expect(res.body.location).toEqual(data.location);
        expect(res.body.bikes).toEqual([]);
        expect(res.body._id).toExist();
      });
    });

    it('should respond with 400', () => {
      let data = {};
      return superagent.post(`${API_URL}/api/bikeShops`)
      .send(data)
      .catch((res) => {
        expect(res.status).toEqual(400);
      });
    });

    it('should respond with 404', () => {
      let data = {};
      return superagent.post(`${API_URL}/api/badroute`)
      .send(data)
      .catch((res) => {
        expect(res.status).toEqual(404);
      });
    });
  });

  describe('testing GET api/bikeShops', () => {

    it('should respond with a bike shop', () => {
      return mockBikeShop.createOne()
      .then(shop => {
        tempShop = shop;
        return superagent.get(`${API_URL}/api/bikeShops/${shop.id}`);
      })
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual(tempShop.name);
        expect(res.body.location).toEqual(tempShop.location);
        expect(res.body.bikes).toEqual([]);
        expect(res.body._id).toExist();
      });
    });

    it('should respond with 404', () => {
      return superagent.get(`${API_URL}/api/badroute`)
      .catch((res) => {
        expect(res.status).toEqual(404);
      });
    });
  });

  describe('testing PUT api/bikeShops', () => {

    it('should respond with a bike shop', () => {
      let data = {
        name: faker.company.companyName(),
        location:  faker.address.streetName(),
      };

      return mockBikeShop.createOne()
      .then(shop => {
        return superagent.put(`${API_URL}/api/bikeShops/${shop._id}`)
        .send(data);
      })
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual(data.name);
        expect(res.body.location).toEqual(data.location);
        expect(res.body.bikes).toEqual([]);
        expect(res.body._id).toExist();
      });
    });

    it('should respond with 400', () => {
      let data = {};
      return mockBikeShop.createOne()
      .then(shop => {
        tempShop = shop;
        return superagent.put(`${API_URL}/api/bikeShops/${shop.id}`)
        .send(data);
      })
      .catch((res) => {
        expect(res.status).toEqual(400);
      });
    });

    it('should respond with 404', () => {
      let data = {};
      return superagent.put(`${API_URL}/api/badroute`)
      .send(data)
      .catch((res) => {
        expect(res.status).toEqual(404);
      });
    });
  });

  describe('testing DELETE api/bikeShops', () => {

    it('should delete a bike shop', () => {
      return mockBikeShop.createOne()
      .then(shop => {
        return superagent.delete(`${API_URL}/api/bikeShops/${shop._id}`);
      })
      .then((res) => {
        expect(res.status).toEqual(204);
      });
    });

    it('should respond with 404', () => {
      return superagent.delete(`${API_URL}/api/badroute`)
      .catch((res) => {
        expect(res.status).toEqual(404);
      });
    });
  });
});
