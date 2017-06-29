'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');

const server = require('../lib/server.js');
const mockStudent = require('./lib/mock-student.js');

describe('test student routes', () =>{
  before(server.start);
  after(server.stop);

  describe('test POST of /api/student', () =>{
    it('should respond with 200 status', () =>{
      console.log(`${process.env.API_URL}/api/student`);
      let tempStudent = mockStudent.createOne();
      console.log(tempStudent);
      return superagent.post(`${process.env.API_URL}/api/student`)
      .send(tempStudent)
      .then(res => {
        console.log('something here');
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual(tempStudent.name);
      });
    });
    it('should return 409', () =>{
      return superagent.post(`${process.env.API_URL}/api/student`)
      .send(tempStudent)
      .catch(()=> {
        expect(res.status).toEqual(409)
      })
    })
  });
});
