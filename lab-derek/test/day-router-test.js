'use strict';

require('dotenv').config({path: `${__dirname}/./.test.env`});

//npm modules
const expect = require('expect');
const superagent = require ('superagent');

//app modules
const clearDB = require('./lib/clear-db.js');
const server = require('../lib/server.js');
const Year = require('../model/year.js');
const mockYear = require('./lib/mock-year.js');
const mockDay = require('./lib/mock-day.js');

//module constants
const API_URL = process.env.API_URL;
let tempYear;
let tempDay;

describe('testing /api/days', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  //TODO: POST - test 200, response body like {<data>} for a post request with a valid body
  describe('testing POST /api/days', () => {
    it('should create a day', () => {
      return mockYear.createOne()
      .then(year => {
        tempYear = year;
        return superagent.post(`${API_URL}/api/days`)
        .send({
          dayOfWeek: 'sun',
          dayOfYear: 1,
          year: tempYear._id.toString(),
        });
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.dayOfWeek).toEqual('sun');
        expect(res.body.dayOfYear).toEqual(1);
        expect(res.body.year).toEqual(tempYear._id.toString());
        tempDay = res.body;
        return Year.findById(tempYear._id);
      })
      .then(year => {
        expect (year.days.length).toEqual(1);
        expect(year.days[0].toString()).toEqual(tempDay._id.toString());
      });
    });
    //TODO: POST - test 400, with an invalid request body
    it('should return a status 400 wat invalid request body - dayOfWeek', () => {
      return mockYear.createOne()
      .then(year => {
        tempYear = year;
        return superagent.post(`${API_URL}/api/days`)
        .send({
          dayOfWeek: 'asdf',
          dayOfYear: 1,
          year: tempYear._id.toString(),
        })
        .then(res => {throw res})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
      });
    });
  });
    //TODO: GET - test 404, responds with 'not found' for valid request made with an id that was not found
  describe('testing GET api/days/:id', () => {
    it('should return a status 404 for invalid id', () => {
      return mockDay.createOne()
      .then((year) => {
        tempYear = year;
        return superagent.get(`${API_URL}/api/days/not-an-id`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
      });
    });
  //TODO: GET - test 200, response body like {<data>} for a request made with a valid id
    it('should return a status 200 and day', () => {
      return mockDay.createOne()
      .then((year) => {
        tempYear = year;
        console.log('year', year);
        console.log('tempday.name', tempYear.name);
        console.log('tempYear', tempYear);
        return superagent.get(`${API_URL}/api/days/${tempYear.day._id}`)
        .then(res => {
          console.log('looking for tempYear.day lulwat', tempYear.day);
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual(tempYear.day.dayOfWeek);
          expect(res.body.dayJan1).toEqual(tempYear.day.dayOfYear);
        })
        .catch(res =>
        console.log('watwat', tempYear.day._id));
      });
    });
  });
});//close final describe block




//
//   //TODO: POST - test 409, with an a conflict for a unique property
//     it('should return a status 409 with invalid request body - name', () => {
//       let data = {name: 2017, dayJan1: 'SUN'};
//       superagent.post(`${API_URL}/api/years`)
//       .send(data);
//       return superagent.post(`${API_URL}/api/years`)
//       .send(data)
//       .catch(res => {
//         expect(res.status).toEqual(409);
//       });
//     });
//   });
//

//   //TODO: create a GET /api/resource route that has pagination using query strings
//     it('should return a status 200 and array of 3 years', () => {
//       return superagent.get(`${API_URL}/api/years`)
//       .then(res => {
//         console.log(res.body.map(year => year.name));
//         expect(res.status).toEqual(200);
//         expect(res.body.length).toEqual(3);
//         res.body.forEach(year => {
//           expect(year._id).toExist();
//           expect(year.name).toExist();
//         });
//       });
//     });
//     it('should return a status 200 and array of 3 years', () => {
//       return superagent.get(`${API_URL}/api/years?=page2`)
//       .then(res => {
//         console.log(res.body.map(year => year.name));
//         expect(res.status).toEqual(200);
//         expect(res.body.length).toEqual(3);
//         res.body.forEach(year => {
//           expect(year._id).toExist();
//           expect(year.name).toExist();
//         });
//       });
//     });
//   });
//   describe('testing PUT api/years/:id', () => {
//     beforeEach(() => {
//       return mockYear.createOne()
//       .then((year) => {
//         tempYear = year;
//       });
//     });
//     //TODO: PUT - test 200, response body like {<data>} for a post request with a valid body
//     it('should return a status 200 and updated year', () => {
//       let data = {name: 2017};
//       return superagent.put(`${API_URL}/api/years/${tempYear._id}`)
//       .send(data)
//       .then(res => {
//         expect(res.status).toEqual(200);
//         expect(res.body.name).toEqual(data.name);
//         expect(res.body.dayJan1).toEqual(tempYear.dayJan1);
//       });
//     });
//   //TODO: PUT - test 404, with invalid id
//     it('should return a status 404 for invalid id', () => {
//       let data = {name: 2017};
//       return superagent.put(`${API_URL}/api/years/not-an-id`)
//       .send(data)
//       .catch(res => {
//         expect(res.status).toEqual(404);
//       });
//     });
//   //TODO: PUT - test 400, with invalid body
//     it('should return a status 400 with invalid body', () => {
//       let data = {name: 'asdf'};
//       return superagent.put(`${API_URL}/api/years/${tempYear._id}`)
//       .send(data)
//       .catch(res => {
//         expect(res.status).toEqual(400);
//       });
//     });
//   });
//   describe('testing DELETE api/years/:id', () => {
//     beforeEach(() => {
//       return mockYear.createOne()
//       .then((year) => {
//         tempYear = year;
//       });
//     });
//     //TODO: DELETE - test 204, with valid id
//     it('should return a status 204 for valid id', () => {
//       return superagent.delete(`${API_URL}/api/years/${tempYear._id}`)
//       .catch(res => {
//         expect(res.status).toEqual(204);
//       });
//     });
//     //TODO: DELETE - test 404, with invalid id
//     it('should return a status 404 for valid id', () => {
//       return superagent.delete(`${API_URL}/api/years/not-an-id`)
//       .catch(res => {
//         expect(res.status).toEqual(404);
//       });
//     });
//   });
// }); // end top-level describe block.
