'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(require('../route/nhl-player-router.js'));
app.use(require('../route/nhl-team-router.js'));

app.use(require('./error-middleware.js'));

app.all('/api/*', (req, res) => { // api/ because we might want a different 404 for our actual website
  res.sendStatus(404);
});

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
      return server.http.close(() => {
        server.isOn = false;
        console.log('Server down');
        resolve();
      });
    }
    reject(new Error('Server is not running'));
  });
};
