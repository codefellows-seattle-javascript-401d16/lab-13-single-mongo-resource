'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');
const NHLTeam = require('../model/nhl-team.js');

const API_URL = process.env.API_URL;

describe('testing nonexistent endpoint', () => {
  before(server.start);
  after(server.stop);

  it('Should respond 404', () => {
    return superagent.get(`${API_URL}/dkasjdk`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
  });
});

describe('testing /api/characters routes', () => {
  before(server.start);
  after(server.stop);

  describe('POST', () => {
    after(() => Character.remove({}));
    let data = {
      name: 'Spen Gietz',
      age: 21,
      class: 'Mage',
      primaryProfession: 'Coding',
      secondaryProfession: 'Gaming',
    };

    it('Should respond 200 with the character', () => {
      return superagent.post(`${API_URL}/api/characters`)
        .send(data)
        .then(res => {
          expect(res.body).toMatch({
            _id: /^[a-f\d]{24}$/i,
            name: 'Spen Gietz',
            age: 21,
            class: 'Mage',
            primaryProfession: 'Coding',
            secondaryProfession: 'Gaming',
          });
        });
    });
    it('Should respond 400', () => {
      return superagent.post(`${API_URL}/api/characters`)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('Should respond 400', () => {
      return superagent.post(`${API_URL}/api/characters`)
        .send({age: 33})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('Should respond 409', () => {
      return superagent.post(`${API_URL}/api/characters`)
        .send(data)
        .catch(res => {
          expect(res.status).toEqual(409);
        });
    });
  });
  describe('GET', () => {
    afterEach(() => Character.remove({}));
    beforeEach(() => {
      return new Character({
        name: 'Bill Fill',
        age: 55,
        class: 'Bard',
        primaryProfession: 'Blacksmithing',
        secondaryProfession: 'Alchemy',
      })
      .save()
      .then(character => {
        tempCharacter = character;
      });
    });

    it('Should respond 200 with all of the characters', () => {
      return superagent.get(`${API_URL}/api/characters`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body).toBeAn(Array);
        });
    });
    it('Should respond 200 with a character', () => {
      return superagent.get(`${API_URL}/api/characters/${tempCharacter._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body).toMatch({
            _id: /^[a-f\d]{24}$/i,
            name: 'Bill Fill',
            age: 55,
            class: 'Bard',
            primaryProfession: 'Blacksmithing',
            secondaryProfession: 'Alchemy',
          });
        });
    });
    it('Should respond 404', () => {
      return superagent.get(`${API_URL}/api/characters/afasfasfsadasd`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('PUT', () => {
    afterEach(() => Character.remove({}));
    beforeEach(() => {
      return new Character({
        name: 'Bill Fill',
        age: 55,
        class: 'Bard',
        primaryProfession: 'Blacksmithing',
        secondaryProfession: 'Alchemy',
      })
      .save()
      .then(character => {
        tempCharacter = character;
      });
    });

    it('Should respond 200 with the updated character', () => {
      return superagent.put(`${API_URL}/api/characters/${tempCharacter._id}`)
        .send({age: 99})
        .then(res => {
          expect(res.status).toEqual(200);
          tempCharacter.age = 99;
          expect(res.body).toMatch({
            _id: /^[a-f\d]{24}$/i,
            name: 'Bill Fill',
            age: 55,
            class: 'Bard',
            primaryProfession: 'Blacksmithing',
            secondaryProfession: 'Alchemy',
          });
        });
    });
  });

  describe('DELETE', () => {
    afterEach(() => Character.remove({}));
    beforeEach(() => {
      return new Character({
        name: 'Bill Fill',
        age: 55,
        class: 'Bard',
        primaryProfession: 'Blacksmithing',
        secondaryProfession: 'Alchemy',
      })
      .save()
      .then(character => {
        tempCharacter = character;
      });
    });

    it('Should respond 204', () => {
      return superagent.delete(`${API_URL}/api/characters/${tempCharacter._id}`)
      .then(res => {
        expect(res.status).toEqual(204);
      });
    });
    it('Should respond 404', () => {
      return superagent.delete(`${API_URL}/api/characters/asdasdasdas`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });
});
