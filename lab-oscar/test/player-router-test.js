'use strit';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

const clearDB = require('./lib/clear-db.js');
const server = require('../lib/server.js');
const Team = require('../model/team.js');
const mockTeam = require('./lib/mock-team.js');
const mockPlayer = require('./lib/mock-player.js');

const API_URL = process.env.API_URL;

describe('testing /api/players', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/players', () => {
    it('should create a player', () => {
      let tempTeam, tempPlayer;
      return mockTeam.createOne()
        .then(team => {
          tempTeam = team;
          return superagent.post(`${API_URL}/api/players`)
            .send({name: 'Oscar', age: 32, position: 'forward', team: team._id.toString(),
            });
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual('Oscar');
          expect(res.body.team).toEqual(tempTeam._id.toString());
          tempPlayer = res.body;
          return Team.findById(tempTeam._id);
        })
        .then(team => {
          expect(team.players.length).toEqual(1);
          expect(team.players[0].toString()).toEqual(tempPlayer._id.toString());
        });
    });
    it('should respond with a 400 for an invalid team id', () => {
      return superagent.post(`${API_URL}/api/players`)
        .send({name: 'new player', age: 45, position: 'defend', team: '25049572049835703984'})
        .then(res => {throw res})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });

});

//
//   describe('testing PUT /api/tasks/:id', () => {
//     it('should respond with the updated task', () => {
//       let tempList, tempTask
//       return mockTask.createOne()
//       .then(({list, task}) => {
//         tempTask = task
//         tempList = list
//         return superagent.put(`${API_URL}/api/tasks/${tempTask._id.toString()}`)
//         .send({content: 'hello world'})
//       })
//       .then(res => {
//         expect(res.status).toEqual(200)
//         expect(res.body.content).toEqual('hello world')
//         expect(res.body._id).toEqual(tempTask._id)
//         expect(res.body.list).toEqual(tempList._id)
//         return List.findById(tempList._id)
//       })
//       .then(list => {
//         expect(list.tasks.length).toEqual(1)
//         expect(list.tasks[0].toString()).toEqual(tempTask._id.toString())
//       })
//     })
//   })
//
// })
