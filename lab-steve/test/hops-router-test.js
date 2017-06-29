'use strict';

require('dotenv').config({path: './test/.env'});
const request = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let temp;
