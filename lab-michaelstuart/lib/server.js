'use strict';

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const MLAB_URI = `mongodb://${process.env.MUSER}:${process.env.MPASS}@ds1${process.env.MPORT}.mlab.com:${process.env.MPORT}/express_api_1`;

mongoose.Promise = Promise;
mongoose.connect(MLAB_URI);

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(require('../route/user-router.js'));
app.use(require('./error-middleware.js'));

app.all('api/*', (req, res) => res.sendStatus(404));

const server = module.exports = {};

server.start = () => {
  return new Promise((resolve, reject) => {
    if (!server.isOn) {
      server.http = app.listen(process.env.PORT, () => {
        console.log('server up', process.env.PORT);
        server.isOn = true;
        resolve();
      });
      return;
    }
    reject(new Error('server running already'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if (server.http && server.isOn) {
      server.http.close(() => {
        console.log('server down');
        server.isOn = false;
        resolve();
      });
      return;
    }
    reject(new Error('server not running'));
  });
};
