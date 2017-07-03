'use strict';

require('dotenv').config();
require('./lib/server.js').start().then().catch((err) => console.error(err));
