'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

const clearDB = require('./lib/clear-db')
const server = require('../lib/server.js')
const BikeShop = require('../model/bike-shop.js');
const mockBikeShop = require('./lib/mock-bike-shop.js');
const mockBike = require('./lib/mock-bike.js');

const API_URL = process.env.API_URL;

describe('testing /api/bikes', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('POST /api/bikes', () => {
    it('should respond with a bike', () => {
      let tempShop;
      let tempBike;
      return mockBikeShop.createOne()
      .then(shop => {
        tempShop = shop;
        return superagent.post(`${API_URL}/api/bikes`)
        .send({
          make: 'Commencal',
          model: 'Meta',
          shop: shop._id.toString(),
        });
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.make).toEqual('Commencal');
        expect(res.body.model).toEqual('Meta');
        expect(res.body.shop).toEqual(tempShop._id.toString());
        tempBike = res.body;
        return BikeShop.findById(tempShop._id);
      })
      .then(shop => {
        expect(shop.bikes.length).toEqual(1);
        expect(shop.bikes[0].toString()).toEqual(tempBike._id.toString());
      });
    });
  });
});
