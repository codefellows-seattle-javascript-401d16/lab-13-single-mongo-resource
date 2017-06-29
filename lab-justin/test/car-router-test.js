'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

// npm modules
const expect = require('expect');
const superagent = require('superagent');

// app modules
const Car = require('../model/car.js');
const mockCar = require('./lib/mock-car.js');
const server = require('../lib/server.js');


let tempCar;
const API_URL = process.env.API_URL;

describe('testing car router', () => {
  before(server.start);
  after(server.stop);

  describe('testing POST /api/cars', () => {
    after(() => Car.remove({}));

    let data = {
      make: 'Ford',
      model: 'Mustang',
      year: '2017',
    };

    it('should respond with a car and 200 status', () => {
      return superagent.post(`${API_URL}/api/cars`)
      .send(data)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.make).toEqual(data.make);
        expect(res.body.model).toEqual(data.model);
        expect(res.body.year).toEqual(data.year);
      });
    });

    // 400 because no body
    it('should respond with a 400', () => {
      return superagent.post(`${API_URL}/api/cars`)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

    // 400 because no content
    it('should respond with a 400', () => {
      return superagent.post(`${API_URL}/api/cars`)
      .send({make: 'kjsdflj', year: '2017'})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

    // 400 because no title
    it('should respond with a 400', () => {
      return superagent.post(`${API_URL}/api/cars`)
      .send({model: 'kjsdfljslfkjlsdfkj', year: '2017'})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

    // 400 because content length is < 10
    it('should respond with a 400', () => {
      return superagent.post(`${API_URL}/api/cars`)
      .send({make: 'hello ', model: 'ha', year: 'year'})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

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

  describe('testing GET /api/cars/:id', () => {
    var tempCar;

    afterEach(() => Car.remove({}));
    beforeEach(() => {
      return new Car({
        make: 'hello world',
        model: 'lsakjf laksjf lkajsdf lkjasflkjasf',
        year: 2000,
      })
      .save()
      .then(car => {
        tempCar = car;
      });
    });

    it('should respond with a car', () => {
      console.log('tempCar', tempCar);
      return superagent.get(`${API_URL}/api/cars/${tempCar._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempCar._id);
        expect(res.body.make).toEqual(tempCar.make);
        expect(res.body.model).toEqual(tempCar.model);
        expect(res.body.year).toEqual(tempCar.year);
      });
    });
  });

  describe('testing PUT /api/cars/:id', () => {
    afterEach(() => Car.remove({}));
    beforeEach(() => {
      return new Car({
        make: 'hello world',
        model: 'lsakjf laksjf lkajsdf lkjasflkjasf',
        year: 2000,
      })
      .save()
      .then(car => {
        tempCar = car;
      });
    });

    it('should respond with a car', () => {
      console.log('tempCar', tempCar);
      return superagent.put(`${API_URL}/api/cars/${tempCar._id}`)
      .send({make: 'hello this is cool'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempCar._id);
        expect(res.body.make).toEqual('hello this is cool');
        expect(res.body.model).toEqual(tempCar.model);
        expect(res.body.year).toEqual(tempCar.year);
      });
    });

    it('should respond with a car', () => {
      console.log('tempCar', tempCar);
      return superagent.put(`${API_URL}/api/cars/${tempCar._id}`)
      .send({model: 'hehe'})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
  });

  describe('testing DELETE /api/cars/:id', () => {
    afterEach(() => Car.remove({}));
    beforeEach(() => {
      return new Car({
        make: 'hello world',
        model: 'lsakjf laksjf lkajsdf lkjasflkjasf',
        year: 2000,
      })
      .save()
      .then(note => {
        tempCar = note;
      });
    });

    it('should delete a car', () => {
      console.log('tempCar', tempCar);
      return superagent.delete(`${API_URL}/api/cars/${tempCar._id}`)
      .then(res => {
        expect(res.status).toEqual(204);
      });
    });

    it('bad id should respond with a 404', () => {
      console.log('tempCar', tempCar);
      return superagent.delete(`${API_URL}/api/cars/12134`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
    it('bad id should respond with a 404', () => {
      console.log('tempCar', tempCar);
      return superagent.delete(`${API_URL}/api/cars/5952a8d5c1b8d566a64ea23f`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });
});
