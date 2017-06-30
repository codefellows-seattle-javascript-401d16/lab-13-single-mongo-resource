'use strict';


require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

const clearDB = require('./lib/clear-db');
const server = require('../lib/server.js');
const School = require('../model/school.js');
const mockSchool = require('./lib/mock-school.js');
const mockStudent = require('./lib/mock-student.js');

const API_URL = process.env.API_URL;
