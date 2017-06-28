'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');
const NHLTeam = require('../model/nhl-team.js');

const API_URL = process.env.API_URL;
