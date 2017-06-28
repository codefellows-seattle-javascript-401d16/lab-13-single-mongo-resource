'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const expect = require('expect');
const superagent = require('superagent');
const Team = require('../model/team.js');
const server = require('../lib/server.js');

let tempTeam;
const API_URL = process.env.API_URL;

describe('Testing team routes', () => {
  before(server.start);
  after(server.stop);

  describe('Testing POST /api/team', () => {
    after(() => Team.remove({}));
    let data = {
      firstName: 'Michael',
      lastName: 'Miller',
      availabilityDate: ['07/02/2017', '07/09/2017'],
    };
    it('Should return a new team member', () => {
      return superagent.post(`${API_URL}/api/team`)
      .send(data)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.firstName).toEqual(data.firstName);
        expect(res.body.lastName).toEqual(data.lastName);
        expect(res.body.availabilityDate).toEqual(data.availabilityDate);
      });
    });
    it('Should respond with a 400 status code', () => {
      return superagent.post(`${API_URL}/api/team`)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('Should respond with a 409 status code', () => {
      return superagent.post(`${API_URL}/api/team`)
      .send(data)
      .catch(res => {
        expect(res.status).toEqual(409);
      });
    });
  });

  describe('Testing GET /api/team:id', () => {
    afterEach(() => Team.remove({}));

    beforeEach(() => {
      return new Team({
        firstName: 'Michael',
        lastName: 'Miller',
        availabilityDate: ['07/02/2017', '07/09/2017'],
      })
      .save()
      .then(team => tempTeam = team);
    });

    it('Should respond with a team member', () => {
      return superagent.get(`${API_URL}/api/team/${tempTeam._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempTeam._id);
        expect(res.body.firstName).toEqual(tempTeam.firstName);
        expect(res.body.lastName).toEqual(tempTeam.lastName);
        expect(res.body.availabilityDate).toEqual(tempTeam.availabilityDate);
        expect(res.body.submitted).toExist();
      });
    });

    it('Should respond with a 404', () => {
      return superagent.get(`${API_URL}/api/team/5952a8d5c1b8d566a64ea23g`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });

  describe('Testing PUT /api/team/:id', () => {
    afterEach(() => Team.remove({}));

    beforeEach(() => {
      return new Team({
        firstName: 'Michael',
        lastName: 'Miller',
        availabilityDate: ['07/02/2017', '07/09/2017'],
      })
      .save()
      .then(team => tempTeam = team);
    });

    it('Should respond with a changed team member', () => {
      return superagent.put(`${API_URL}/api/team/${tempTeam._id}`)
      .send({firstName: 'John'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempTeam._id);
        expect(res.body.firstName).toEqual('John');
        expect(res.body.lastName).toEqual(tempTeam.lastName);
        expect(res.body.availabilityDate).toEqual(tempTeam.availabilityDate);
        expect(res.body.submitted).toExist();
      });
    });

    it('Should respond with a 400 status code', () => {
      return superagent.put(`${API_URL}/api/team/${tempTeam._id}`)
      .send({})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

    it('Should respond with a 404', () => {
      return superagent.put(`${API_URL}/api/team/5952a8d5c1b8d566a64ea23g`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });

  describe('Testing DELETE /api/team:id', () => {
    afterEach(() => Team.remove({}));

    beforeEach(() => {
      return new Team({
        firstName: 'Michael',
        lastName: 'Miller',
        availabilityDate: ['07/02/2017', '07/09/2017'],
      })
      .save()
      .then(team => tempTeam = team);
    });
    it('Should remove specified(by _id) team member', () => {
      return superagent.delete(`${API_URL}/api/team/${tempTeam._id}`)
      .then(res => {
        expect(res.status).toEqual(204);
      });
    });

    it('Should respond with a 404', () => {
      return superagent.delete(`${API_URL}/api/team/5952a8d5c1b8d566a64ea23f`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });
});
