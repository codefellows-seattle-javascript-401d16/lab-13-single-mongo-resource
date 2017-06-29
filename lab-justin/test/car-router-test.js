'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

// npm modules
const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');

// app modules
// const Car = require('../model/car.js');
const mockCar = require('./lib/mock-car.js');
const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');


let tempCar;
const API_URL = process.env.API_URL;

describe('testing car router', () => {
  before(server.start);
  after(server.stop);
  after(clearDB);

  describe('testing POST /api/cars', () => {
    // after(() => Car.remove({}));

    let data = {
      make: 'Ford',
      model: faker.random.word(),
      year: faker.random.number(4),
    };

    it('should respond with a car and 200 status', () => {
      return superagent.post(`${API_URL}/api/cars`)
      .send(data)
      .then(res => {
        console.log('data', data);
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.make).toEqual(data.make);
        expect(res.body.model).toEqual(data.model);
        expect(res.body.year).toEqual(data.year);
        expect(res.body.drivers).toEqual([]);
      });
    });

    // 400 because no body
    it('should respond with a 400', () => {
      return superagent.post(`${API_URL}/api/cars`)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

    // // 400 because no content
    // it('should respond with a 400', () => {
    //   return superagent.post(`${API_URL}/api/cars`)
    //   .send({make: 'kjsdflj', year: '2017'})
    //   .catch(res => {
    //     expect(res.status).toEqual(400);
    //   });
    // });
    //
    // // 400 because no title
    // it('should respond with a 400', () => {
    //   return superagent.post(`${API_URL}/api/cars`)
    //   .send({model: 'kjsdfljslfkjlsdfkj', year: '2017'})
    //   .catch(res => {
    //     expect(res.status).toEqual(400);
    //   });
    // });
    //
    // // 400 because content length is < 10
    // it('should respond with a 400', () => {
    //   return superagent.post(`${API_URL}/api/cars`)
    //   .send({make: 'hello ', model: 'ha', year: 'year'})
    //   .catch(res => {
    //     expect(res.status).toEqual(400);
    //   });
    // });

    // 409 because it has the same title twice and the model says it should
    // be unique
    it('should respond with a 409', () => {
      return superagent.post(`${API_URL}/api/cars`)
      .send(data)
      .catch(res => {
        expect(res.status).toEqual(409);
      });
    });
  });

  describe('Testing GET /api/cars:id', () => {
    it('Should respond with a cars', () => {
      return mockCar.createOne()
        .then(cars => {
          tempCar = cars;
          return superagent.get(`${API_URL}/api/cars/${tempCar._id}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.make).toEqual(tempCar.make);
          expect(res.body.model).toEqual(tempCar.model);
          expect(res.body.year).toEqual(tempCar.year);
          expect(res.body.drivers).toEqual([]);
        });
    });
    it('should respond with a 404 status', () => {
      return mockCar.createOne()
       .then(car => {
         tempCar = car;
         return superagent.get(`${API_URL}/api/cars/`);
       })
       .catch(res => {
         expect(res.status).toEqual(404);
       });
    });
  });

  describe('testing PUT /api/cars/:id', () => {
    afterEach(clearDB);
    beforeEach(() => {
      return mockCar.createOne()
      .then(car => {
        tempCar = car;
      });
    });
    it('should respond with an updated car and 200 status', () => {
      return superagent.put(`${API_URL}/api/cars/${tempCar._id}`)
      .send({make: 'Chrysler'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.make).toEqual('Chrysler');
        expect(res.body.model).toEqual(tempCar.model);
        expect(res.body.year).toEqual(tempCar.year);
        expect(res.body.drivers).toEqual([]);
      });
    });
    it('Should respond with a 400 status code', () => {
      return superagent.put(`${API_URL}/api/cars/${tempCar._id}`)
          .send({make:''})
          .catch(res => {
            expect(res.status).toEqual(400);
          });
    });
    it('should respond with a 404 status', () => {
      return superagent.put(`${API_URL}/api/cars/1328472`)
      .send({make: 'Range Rover'})
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });

  describe('Testing DELETE /api/cars:id', () => {
    it('Should remove a car', () => {
      return mockCar.createOne()
      .then(cars => {
        tempCar = cars;
        return superagent.delete(`${API_URL}/api/cars/${tempCar._id}`);
      })
      .then(res => {
        expect(res.status).toEqual(204);
      });
    });

    it('Should respond with a 404', () => {
      return superagent.delete(`${API_URL}/api/cars/`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });
});
