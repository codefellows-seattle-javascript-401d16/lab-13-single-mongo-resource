'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.use(morgan('dev'));

app.use(require('../route/nhl-team-route.js'));

app.all('/api/*', (req, res) => {
  res.sendStatus(404);
});

app.use(require('./error-middleware.js'));

const server = module.exports = {};
server.isOn = false;

server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) {
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log(`Server is up at localhost:${process.env.PORT}`);
        resolve();
      });
      return;
    }
    reject(new Error('Server is already running'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(server.http && server.isOn) {
      server.http = app.close(() => {
        server.isOn = false;
        console.log('Server down');
        resolve();
      });
    }
    reject(new Error('Server is not running'));
  });
};
