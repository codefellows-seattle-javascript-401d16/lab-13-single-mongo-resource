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
  after(clearDB);

  describe('testing POST /api/teams', () => {
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
          expect(res.body.name).toEqual(tempTeam.name);
          expect(res.body.owner).toEqual(tempTeam.owner);
          expect(res.body.founded).toEqual(tempTeam.founded);
        });
    });
    it('should respond with code 404', () => {
      return superagent.get(`${API_URL}/api/teams/73737929`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
  describe('testing PUT /api/teams/:id', () => {
    let tempTeam;
    after(clearDB);
    before(() => mockTeam.createOne()
      .then(team => {
        tempTeam = team;
      })
    );

    it('should respond with code 200', () => {
      return superagent.put(`${API_URL}/api/teams/${tempTeam._id}`)
        .send({owner:'marineros'})
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.owner).toEqual('marineros');
        });
    });
    it('should respond with code 400', () => {
      return superagent.put(`${API_URL}/api/teams/${tempTeam._id}`)
        .send({founded: '56'})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('should respond with code 404', () => {
      return superagent.put(`${API_URL}/api/teams/47834`)
        .send({founded: '56'})
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('testing DELETE /api/teams/:id', () => {
    let tempTeam;
    // after(clearDB);
    before(() => mockTeam.createOne()
      .then(team => {
        tempTeam = team;
      })
    );
    it('should respond with 200 code', () => {
      return superagent.delete(`${API_URL}/api/teams/${tempTeam._id}`)
        .then(res => {
          expect(res.status).toEqual(204);
          expect(res.body).toEqual({});
        });
    });
    it('should respond with 404 code', () => {
      return superagent.delete(`${API_URL}/api/teams/4747747`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
});



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
