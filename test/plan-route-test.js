'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const clearTrainer = require('./lib/clearTrainers.js');
const Trainer = require('../model/trainer.js');
const mockPlan = require('./lib/mockPlan.js');
const mockTrainer = require('./lib/mockTrainer.js');

const API_URL = `http://localhost:${process.env.PORT}`;

describe('Testing resource requests', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearTrainer);

  describe('Testing POST requests', () => {
    it('Should post data and return a 200 status', () => {
      let tempTrainer;
      let tempPlan;
      return mockTrainer.createOne()
      .then(trainer => {
        tempTrainer = trainer;
        return superagent.post(`${API_URL}/api/plans`)
        .send({
          fitness: 'cardio',
          diet: 'ketosis',
          trainer: trainer._id.toString(),
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.fitness).toEqual('cardio');
          expect(res.body.diet).toEqual('ketosis');
          expect(res.body.trainer).toEqual(trainer._id.toString());
          tempPlan = res.body;
          console.log('plan', tempPlan);
          console.log('trainer', tempTrainer);
          return Trainer.findById(tempTrainer._id);
        })
        .then(trainer => {
          console.log(trainer.plans);
          expect(trainer.plans.length).toEqual(1);
          expect(trainer.plans[0].toString()).toEqual(tempPlan._id.toString());
        });
      });
    });
  //   it('should return a 400 status', () => {
  //     return superagent.post(`${API_URL}/api/plans`)
  //     .send({})
  //     .catch(res => {
  //       expect(res.status).toEqual(400);
  //     });
  //   });
  //   it('should delete data from db and return 409 status', () => {
  //     let tempPlan;
  //     return mockPlan.createOne()
  //     .then(plan => {
  //       tempPlan = plan;
  //       return superagent.post(`${API_URL}/api/plans`)
  //       .send(tempPlan);
  //     })
  //     .catch(res => {
  //       expect(res.status).toEqual(409);
  //     });
  //   });
  // });
  // describe('Testing GET requests', () => {
  //   it('Should return plan name with 200 status', () => {
  //     let tempPlan;
  //     return mockPlan.createOne()
  //     .then(plan => {
  //       tempPlan = plan;
  //       return superagent.get(`${API_URL}/api/plans/${plan._id}`);
  //     })
  //     .then(res => {
  //       expect(res.status).toEqual(200);
  //       expect(res.body.name).toEqual(tempPlan.name);
  //       expect(res.body._id).toExist();
  //       expect(res.body.plan).toEqual([]);
  //     });
  //   });
  //   it('Should return plan name with 404 status', () => {
  //     let tempPlan;
  //     return mockPlan.createOne()
  //     .then(plan => {
  //       tempPlan = plan;
  //       return superagent.get(`${API_URL}/api/plans/1234`);
  //     })
  //     .catch(res => {
  //       expect(res.status).toEqual(404);
  //     });
  //   });
  // });
  // describe('Testing PUT requests', () => {
  //   it('should update db and return 200 status', () => {
  //     let planData = {name: faker.name.title()};
  //     let tempPlan;
  //     return mockPlan.createOne()
  //     .then(plan => {
  //       tempPlan = plan;
  //       return superagent.put(`${API_URL}/api/plans/${plan._id}`)
  //       .send({planData});
  //     })
  //     .then(res => {
  //       expect(res.status).toEqual(200);
  //       expect(res.body.name).toEqual(tempPlan.name);
  //       expect(res.body._id).toExist();
  //       expect(res.body.plan).toEqual([]);
  //     });
  //   });
  //   it('should attempt to update db and return 404 status', () => {
  //     let planData = {name: faker.name.title()};
  //     let tempPlan;
  //     return mockPlan.createOne()
  //     .then(plan => {
  //       tempPlan = plan;
  //       return superagent.put(`${API_URL}/api/plans/1234`)
  //       .send({planData});
  //     })
  //     .catch(res => {
  //       expect(res.status).toEqual(404);
  //     });
  //   });
  //   it('should attempt to update db and return 400 status', () => {
  //     let tempPlan;
  //     return mockPlan.createOne()
  //     .then(plan => {
  //       tempPlan = plan;
  //       return superagent.put(`${API_URL}/api/plans/${plan._id}`)
  //       .send('bad content');
  //     })
  //     .catch(res => {
  //       console.log(res.body);
  //       expect(res.status).toEqual(400);
  //     });
  //   });
  // });
  // describe('Testing Delete requests', () => {
  //   it('should delete data from db and return 204 status', () => {
  //     let tempPlan;
  //     return mockPlan.createOne()
  //     .then(plan => {
  //       tempPlan = plan;
  //       return superagent.delete(`${API_URL}/api/plans/${plan._id}`);
  //     })
  //     .then(res => {
  //       expect(res.status).toEqual(204);
  //       expect(res.body).toEqual({});
  //     });
  //   });
  //   it('should delete data from db and return 404 status', () => {
  //     let tempPlan;
  //     return mockPlan.createOne()
  //     .then(plan => {
  //       tempPlan = plan;
  //       return superagent.delete(`${API_URL}/api/plans/1234`);
  //     })
  //     .then(res => {throw res})
  //     .catch(res => {
  //       expect(res.status).toEqual(404);
  //     });
  //   });
  });
});
