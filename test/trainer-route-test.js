// 'use strict';
//
// require('dotenv').config({path: `${__dirname}/../.test.env`});
//
// const faker = require('faker');
// const expect = require('expect');
// const superagent = require('superagent');
//
// const server = require('../lib/server.js');
// const clearTrainer = require('./lib/clearTrainers.js');
// const mockTrainer = require('./lib/mockTrainer.js');
//
// const API_URL = `http://localhost:${process.env.PORT}`;
//
// let tempTrainer;
//
// describe('Testing resource requests', () => {
//   before(server.start);
//   after(server.stop);
//   afterEach(clearTrainer);
//
//   describe('Testing POST requests', () => {
//     let trainerData = {name: faker.name.title()};
//     it('Should post data and return a 200 status', () => {
//       return superagent.post(`${API_URL}/api/trainers`)
//       .send(trainerData)
//       .then(res => {
//         expect(res.status).toEqual(200);
//         expect(res.body.name).toEqual(trainerData.name);
//         expect(res.body.plan).toEqual([]);
//         expect(res.body._id).toExist();
//       });
//     });
//     it('should return a 400 status', () => {
//       return superagent.post(`${API_URL}/api/trainers`)
//       .send({})
//       .catch(res => {
//         expect(res.status).toEqual(400);
//       });
//     });
//     it('should delete data from db and return 409 status', () => {
//       let tempTrainer;
//       return mockTrainer.createOne()
//       .then(trainer => {
//         tempTrainer = trainer;
//         return superagent.post(`${API_URL}/api/trainers`)
//         .send(tempTrainer);
//       })
//       .catch(res => {
//         expect(res.status).toEqual(409);
//       });
//     });
//   });
//   describe('Testing GET requests', () => {
//     it('Should return trainer name with 200 status', () => {
//       let tempTrainer;
//       return mockTrainer.createOne()
//       .then(trainer => {
//         tempTrainer = trainer;
//         return superagent.get(`${API_URL}/api/trainers/${trainer._id}`);
//       })
//       .then(res => {
//         expect(res.status).toEqual(200);
//         expect(res.body.name).toEqual(tempTrainer.name);
//         expect(res.body._id).toExist();
//         expect(res.body.plan).toEqual([]);
//       });
//     });
//     it('Should return trainer name with 404 status', () => {
//       let tempTrainer;
//       return mockTrainer.createOne()
//       .then(trainer => {
//         tempTrainer = trainer;
//         return superagent.get(`${API_URL}/api/trainers/1234`);
//       })
//       .catch(res => {
//         expect(res.status).toEqual(404);
//       });
//     });
//   });
//   describe('Testing PUT requests', () => {
//     it('should update db and return 200 status', () => {
//       let trainerData = {name: faker.name.title()};
//       let tempTrainer;
//       return mockTrainer.createOne()
//       .then(trainer => {
//         tempTrainer = trainer;
//         return superagent.put(`${API_URL}/api/trainers/${trainer._id}`)
//         .send({trainerData});
//       })
//       .then(res => {
//         expect(res.status).toEqual(200);
//         expect(res.body.name).toEqual(tempTrainer.name);
//         expect(res.body._id).toExist();
//         expect(res.body.plan).toEqual([]);
//       });
//     });
//     it('should attempt to update db and return 404 status', () => {
//       let trainerData = {name: faker.name.title()};
//       let tempTrainer;
//       return mockTrainer.createOne()
//       .then(trainer => {
//         tempTrainer = trainer;
//         return superagent.put(`${API_URL}/api/trainers/1234`)
//         .send({trainerData});
//       })
//       .catch(res => {
//         expect(res.status).toEqual(404);
//       });
//     });
//     it('should attempt to update db and return 400 status', () => {
//       let tempTrainer;
//       return mockTrainer.createOne()
//       .then(trainer => {
//         tempTrainer = trainer;
//         return superagent.put(`${API_URL}/api/trainers/${trainer._id}`)
//         .send('bad content');
//       })
//       .catch(res => {
//         console.log(res.body);
//         expect(res.status).toEqual(400);
//       });
//     });
//   });
//   describe('Testing Delete requests', () => {
//     it('should delete data from db and return 204 status', () => {
//       let tempTrainer;
//       return mockTrainer.createOne()
//       .then(trainer => {
//         tempTrainer = trainer;
//         return superagent.delete(`${API_URL}/api/trainers/${trainer._id}`);
//       })
//       .then(res => {
//         expect(res.status).toEqual(204);
//         expect(res.body).toEqual({});
//       });
//     });
//     it('should delete data from db and return 404 status', () => {
//       let tempTrainer;
//       return mockTrainer.createOne()
//       .then(trainer => {
//         tempTrainer = trainer;
//         return superagent.delete(`${API_URL}/api/trainers/1234`);
//       })
//       .then(res => {throw res})
//       .catch(res => {
//         expect(res.status).toEqual(404);
//       });
//     });
//   });
// });
