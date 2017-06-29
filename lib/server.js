'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(require('../route/trainer-route.js'));
// app.use(require('./middleware-error.js'));

const server = module.exports = {};
server.isOn = false;

server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) {
      server.http = app.listen(process.env.PORT, () => {
        console.log(`Server is running on ${process.env.PORT}`);
        server.isOn = true;
        resolve();
      });
      return;
    }
    reject(new Error('Server is aready running!'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(server.http && server.isOn) {
      return server.http.close(() => {
        console.log('Server is down');
        server.isOn = false;
        resolve();
      });
    }
    reject(new Error('Server is not running!'));
  });
};
