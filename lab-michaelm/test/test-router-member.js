'use strict';

// test env
require('dotenv').config({path: `${__dirname}/../.test.env`});

// npm mods
const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');
// app mods
const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockMember = require('./model/mock-member.js');

let tempMember;
const API_URL = process.env.API_URL;

describe('Testing member routes', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('Testing POST /api/member', () => {
    let data = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      availabilityDate: ['07/02/2017', '07/09/2017'],
    };
    it('Should return a new member', () => {
      return superagent.post(`${API_URL}/api/member`)
      .send(data)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.firstName).toEqual(data.firstName);
        expect(res.body.lastName).toEqual(data.lastName);
        expect(res.body.availabilityDate).toEqual(data.availabilityDate);
        expect(res.body._id).toExist();
      });
    });
    it('Should respond with a 400 status code', () => {
      return superagent.post(`${API_URL}/api/member`)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('Should respond with a 409 status code', () => {
      return superagent.post(`${API_URL}/api/member`)
      .send(data)
      .catch(res => {
        expect(res.status).toEqual(409);
      });
    });
  });

  describe('Testing GET /api/member:id', () => {
    it('Should respond with a member', () => {
      return mockMember.createOne()
      .then(member => {
        tempMember = member;
        return superagent.get(`${API_URL}/api/member/${tempMember._id}`);
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempMember._id);
        expect(res.body.firstName).toEqual(tempMember.firstName);
        expect(res.body.lastName).toEqual(tempMember.lastName);
        expect(res.body.availabilityDate).toEqual(tempMember.availabilityDate);
        expect(res.body.submitted).toExist();
      });
    });

    it('Should respond with a 404', () => {
      return superagent.get(`${API_URL}/api/member/5952a8d5c1b8d566a64ea23g`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });

  // describe('Testing GET /api/members', () => {
  //
  //   it('Should respond with a paged array of all members', () => {
  //     let tempMembers;
  //     return mockMember.createMany(20)
  //     .then(members => {
  //       tempMembers = members;
  //       return superagent.get(`${API_URL}/api/members`);
  //     })
  //     .then(res => {
  //       console.log('res.body:\n\n', res.body);
  //       expect(res.status).toEqual(200);
  //       expect(res.body.length).toEqual(10);
  //       res.body.forEach(members => {
  //         expect(members._id).toExist();
  //         expect(members.firstName).toExist();
  //         expect(members.lastName).toExist();
  //         expect(members.availabilityDate).toExist();
  //       });
  //     });
  //   });
  //
  //   it('Should respond with a paged array of all members', () => {
  //     let tempMembers;
  //     return mockMember.createMany(20)
  //     .then(members => {
  //       tempMembers = members;
  //       return superagent.get(`${API_URL}/api/members?page=2`);
  //     })
  //     .then(res => {
  //       console.log('res.body:\n\n', res.body);
  //       expect(res.status).toEqual(200);
  //       expect(res.body.length).toEqual(10);
  //       res.body.forEach(members => {
  //         expect(members._id).toExist();
  //         expect(members.firstName).toExist();
  //         expect(members.lastName).toExist();
  //         expect(members.availabilityDate).toExist();
  //       });
  //     });
  //   });
  //
  //   it('Should respond with an empty array', () => {
  //     let tempMembers;
  //     return mockMember.createMany(20)
  //     .then(members => {
  //       tempMembers = members;
  //       return superagent.get(`${API_URL}/api/members?page=3`);
  //     })
  //     .then(res => {
  //       console.log('res.body:\n\n', res.body);
  //       expect(res.status).toEqual(200);
  //       expect(res.body.length).toEqual(0);
  //     });
  //   });
  //
  //   it('Should respond with a 404', () => {
  //     return superagent.get(`${API_URL}/api/member/5952a8d5c1b8d566a64ea23g`)
  //     .catch(res => {
  //       expect(res.status).toEqual(404);
  //     });
  //   });
  // });

  describe('Testing PUT /api/member/:id', () => {
    let tempMember;
    it('Should respond with a changed member', () => {
      let data = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        availabilityDate: ['07/02/2017', '07/09/2017'],
      };
      return mockMember.createOne()
      .then(member => {
        tempMember = member;
        return superagent.put(`${API_URL}/api/member/${tempMember._id}`)
        .send(data);
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempMember._id);
        expect(res.body.firstName).toEqual(data.firstName);
        expect(res.body.lastName).toEqual(data.lastName);
        expect(res.body.availabilityDate).toEqual(data.availabilityDate);
        expect(res.body.submitted).toExist();
      });
    });

    it('Should respond with a 400 status code', () => {
      return superagent.put(`${API_URL}/api/member/${tempMember._id}`)
      .send({})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

    it('Should respond with a 404', () => {
      return superagent.put(`${API_URL}/api/member/5952a8d5c1b8d566a64ea23g`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });

  describe('Testing DELETE /api/member:id', () => {
    it('Should remove specified(by _id) member', () => {
      return mockMember.createOne()
      .then(member => {
        tempMember = member;
        return superagent.delete(`${API_URL}/api/member/${tempMember._id}`);
      })
      .then(res => {
        expect(res.status).toEqual(204);
      });
    });

    it('Should respond with a 404', () => {
      return superagent.delete(`${API_URL}/api/member/5952a8d5c1b8d566a64ea23f`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });
});
