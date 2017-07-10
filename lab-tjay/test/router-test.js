'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const expect = require('expect');
const superagent = require('superagent');
const BlueTeam = require('../model/blueTeam.js');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;

let tempBlueTeam;

describe('testing BlueTeam Registry Routes, because... BlueTeams :', () => {

  before(server.start);
  after(server.stop);

  //GET GET GET

  describe('testing GET routes :', () => {

    afterEach(() => BlueTeam.remove({}));
    beforeEach(() => {
      return new BlueTeam({
        name: 'Gio',
        position: 'Keeper',
      })
        .save()
        .then(blueTeam => {
          tempBlueTeam = blueTeam;
        });
    });

    it('should return with 200 - Valid request, Valid id :', () => {
      return superagent.get(`${API_URL}/api/blueTeam/${tempBlueTeam._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempBlueTeam._id);
          expect(res.body.name).toEqual(tempBlueTeam.name);
          expect(res.body.position).toEqual(tempBlueTeam.position);
          expect(new Date(res.body.activeSince)).toEqual(tempBlueTeam.activeSince);
        });

    });

    it('should return with 404 - Valid request, no id :', () => {
      return superagent.get(`${API_URL}/api/blueTeam/`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });

  });

  //PUT PUT PUT - DONE

  describe('testing PUT routes :', () => {

    afterEach(() => BlueTeam.remove({}));
    beforeEach(() => {
      return new BlueTeam({
        name: 'Gio',
        position: 'Keeper',
      })
        .save()
        .then(blueTeam => {
          tempBlueTeam = blueTeam;
        });
    });

    it('should return with 200 - Valid request, Valid id :', () => {
      return superagent.put(`${API_URL}/api/blueTeam/${tempBlueTeam._id}`)
        .send({name: 'Duncan', position: 'AckAckAck'})
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempBlueTeam._id);
          expect(res.body.name).toEqual('Duncan');
          expect(res.body.position).toEqual('AckAckAck');
          expect(new Date(res.body.activeSince)).toEqual(tempBlueTeam.activeSince);
        });
    });

    it('should return with 400 - invalid body :', () => {
      return superagent.put(`${API_URL}/api/blueTeam/${tempBlueTeam._id}`)
        .send({name: 12, position: false})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    it('should return with 404 - invalid id :', () => {
      return superagent.put(`${API_URL}/api/blueTeam/8675309`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });

  });

  //DELETE DELETE DELETE - DONE

  describe('testing DELETE routes :', () => {

    afterEach(() => BlueTeam.remove({}));
    beforeEach(() => {
      return new BlueTeam({
        name: 'Gio',
        position: 'Keeper',
      })
        .save()
        .then(blueTeam => {
          tempBlueTeam = blueTeam;
        });
    });

    it('should return with 204 - Valid id :', () => {
      return superagent.delete(`${API_URL}/api/blueTeam/${tempBlueTeam._id}`)
        .then(res => {
          expect(res.status).toEqual(204);
        });
    });

    it('should return with 404 - invalid id :', () => {
      return superagent.delete(`${API_URL}/api/blueTeam/8675309`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });

  });

  //POST POST POST - DONE

  describe('testing POST routes :', () => {
    after(() => BlueTeam.remove({}));

    let demoBlueTeam = {
      name: 'Gio',
      position: 'Keeper',
    };

    it('should return with 200 - Valid request :', () => {
      return superagent.post(`${API_URL}/api/blueTeam`)
        .send(demoBlueTeam)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual('Gio');
          expect(res.body.position).toEqual('Keeper');
          expect(res.body.activeSince).toExist();
        });
    });

    it('should return with 400 - invalid body :', () => {
      return superagent.post(`${API_URL}/api/blueTeam`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    it('should return with 409 - unique ID conflict :', () => {
      return superagent.post(`${API_URL}/api/blueTeam`)
        .send(demoBlueTeam)
        .catch(res => {
          expect(res.status).toEqual(409);
        });
    });

  });

  //404 404 404 - DONE

  describe('testing 404 catch-all route :', () => {
    it('should return with 404 - catch all :', () => {
      return superagent.post(`${API_URL}/`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });




});
