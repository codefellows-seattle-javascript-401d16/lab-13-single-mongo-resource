'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');

const Student = require('../model/student-model.js');
const server = require('../lib/server.js');
const mockStudent = require('./lib/mock-student.js');

describe('test student routes', () =>{

  before(server.start);
  after(server.stop);


  describe('test POST of /api/student', () =>{
    // after(() => Student.remove({}));

    let tempStudent = mockStudent.createOne();
    it('should respond with 200 status', () =>{
      return superagent.post(`${process.env.API_URL}/api/student`)
      .send(tempStudent)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual(tempStudent.name);
      });
    });
    it('should respond 409', () =>{
      return superagent.post(`${process.env.API_URL}/api/student`)
      .send(tempStudent)
      .catch((res)=> {
        expect(res.status).toEqual(409);
      });
    });
    it('should respond 400', () =>{
      return superagent.post(`${process.env.API_URL}/api/student`)
      .send({})
      .catch((res)=> {
        expect(res.status).toEqual(400);
      });
    });
  });



  describe('testing GET /api/student/:id', () => {
    let tempStudent = mockStudent.createOne();
    it('should respond status 200', () => {
      return superagent.get(`${process.env.API_URL}/api/student/${tempStudent._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
      });
    });
    it('should respond status 404', () => {
      return superagent.get(`${process.env.API_URL}/api/student/0844`)
      .catch((res)=> {
        expect(res.status).toEqual(404);
      });
    });
  });



  describe('testing PUT /api/student/:id', () => {
    let tempStudent = mockStudent.createOne();
    it('should respond status 200', () =>{
      return superagent.put(`${process.env.API_URL}/api/student/${tempStudent._id}`)
      .send({name: 'enrique'})
      .then(res => {
        expect(res.status).toEqual(200);
      });
    });
    it('should respond status 400', () =>{
      return superagent.put(`${process.env.API_URL}/api/student/${tempStudent._id}`)
      .send({})
      .catch((res)=> {
        expect(res.status).toEqual(400);
      });
    });
    it('should respond status 404', () =>{
      return superagent.put(`${process.env.API_URL}/api/student/9344`)
      .catch((res)=> {
        expect(res.status).toEqual(404);
      });
    });
  });



  describe('testing DELETE /api/student/:id', () => {
    let tempStudent = mockStudent.createOne();
    it('should respond status 204', () =>{
      return superagent.delete(`${process.env.API_URL}/api/student/${tempStudent._id}`)
      .catch(res => {
        console.log(res);
        expect(res.status).toEqual(204);
      });
    });
    it('should respond status 404', () =>{
      return superagent.delete(`${process.env.API_URL}/api/student/9344`)
      .catch((res)=> {
        expect(res.status).toEqual(404);
      });
    });
  });
});
