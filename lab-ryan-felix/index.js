require('dotenv').config({ path: `${__dirname}/.env`});
const server = require('./lib/server');

server.start();
