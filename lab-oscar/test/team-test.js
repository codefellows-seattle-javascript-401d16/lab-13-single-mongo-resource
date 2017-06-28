'use strict';

require('dotenv').config({path:  `${__dirname}/../.test.env`});

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockTeam = require('./lib/mock-team.js');

const API_URL = process.env.API_URL;


//tests
describe('testing /api/teams', () => {
  before(server.start);
  after(server.stop);

  describe('testing POST /api/teams', () => {
    after(clearDB);
    let data = {name:`${faker.name.findName()}`, owner: `${faker.name.findName()}`, founded: `${faker.date.past()}`};
    it('should respond with a team', () => {
      return superagent.post(`${API_URL}/api/teams`)
        .send(data)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual(data.name);
          expect(res.body.owner).toEqual(data.owner);
          expect(res.body.founded).toEqual(data.founded);
        });
    });
    it('should respond with 400 code', () => {
      return superagent.post(`${API_URL}/api/teams`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('should respond with 409 code', () => {
      return superagent.post(`${API_URL}/api/teams`)
        .send(data)
        .catch(res => {
          expect(res.status).toEqual(409);
        });
    });
  });

  //Get Test
  describe('testing GET /api/teams/:id', () => {
    it('should respond with a team', () => {
      let tempTeam;
      return mockTeam.createOne()
        .then(team => {
          tempTeam = team;
          return superagent.get(`${API_URL}/api/teams/${team._id}`) ;
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
    it('should respond with code 404', () => {
      return superagent.get(`${API_URL}/api/teams/73737929`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
});

//
//   describe('testing GET /api/lists/:id', () => {
//     it('should respond with a list', () => {
//       let tempList;
//       return mockList.createOne()
//       .then(list => {
//         tempList = list;
//         return superagent.get(`${API_URL}/api/lists/${list._id}`)
//       })
//       .then(res => {
//         expect(res.status).toEqual(200)
//         expect(res.body.title).toEqual(tempList.title)
//         expect(res.body.tasks).toEqual([])
//         expect(res.body._id).toExist()
//       })
//     })
//   })
//
//   describe('testing GET /api/lists', () => {
//     it('should respond with a an array of 50 list', () => {
//       let tempLists
//       return mockList.createMany(100)
//       .then(lists => {
//         tempLists = lists;
//         return superagent.get(`${API_URL}/api/lists`)
//       })
//       .then(res => {
//         console.log(res.body.map(list => list.title))
//         expect(res.status).toEqual(200)
//         expect(res.body.length).toEqual(50)
//         res.body.forEach(list => {
//           expect(list._id).toExist()
//           expect(list.tasks).toEqual([])
//           expect(list.title).toExist()
//         })
//       })
//     })
//
//     it('should respond with a an array of 50 list', () => {
//       let tempLists
//       return mockList.createMany(100)
//       .then(lists => {
//         tempLists = lists;
//         return superagent.get(`${API_URL}/api/lists?page=2`)
//       })
//       .then(res => {
//         console.log(res.body.map(list => list.title))
//         expect(res.status).toEqual(200)
//         expect(res.body.length).toEqual(50)
//         //expect(res.body[0].title[0] > 'a').toBeTruthy()
//         res.body.forEach(list => {
//           expect(list._id).toExist()
//           expect(list.tasks).toEqual([])
//           expect(list.title).toExist()
//         })
//       })
//     })
//
//     it('should respond with a an array of 50 list', () => {
//       let tempLists
//       return mockList.createMany(100)
//       .then(lists => {
//         tempLists = lists;
//         return superagent.get(`${API_URL}/api/lists?page=3`)
//       })
//       .then(res => {
//         console.log(res.body.map(list => list.title))
//         expect(res.status).toEqual(200)
//         expect(res.body.length).toEqual(0)
//       })
//     })
//   })
// })
