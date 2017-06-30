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

    it('should respond with a 400 for having a bad list id ', () => {
      return superagent.post(`${API_URL}/api/bikes`)
      .send({
        make: 'Commencal',
        model: 'Meta',
        shop: '595548f2d8e2wsfd4f2ecc24',
      })
      .then(res => {throw res;})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

    it('should respond with 404', () => {
      let data = {};
      return superagent.post(`${API_URL}/api/badroute`)
      .send(data)
      .then(res => {throw res;})
      .catch((res) => {
        expect(res.status).toEqual(404);
      });
    });
  });

  describe('testing GET /api/bikes/:id', () => {

    it('should respond with a bike', () => {
      let tempBike;
      return mockBike.create(1)
      .then(res => {
        console.log('get bikes:id', res.bikes[0]._id);
        tempBike = res.bikes[0];
        return superagent.get(`${API_URL}/api/bikes/${res.bikes[0]._id}`);
      })
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body.make).toEqual(tempBike.name);
        expect(res.body.model).toEqual(tempBike.model);
        expect(res.body._id).toExist();
      });
    });

  });
});
