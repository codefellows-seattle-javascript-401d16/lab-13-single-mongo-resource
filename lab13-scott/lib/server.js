'use strict';

const express = require('express');
const app = express();

//connect and config mongoose/mongoose
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

app.use(require('../route/resort-route.js'));
app.all('/api/*', (req, res, next) => res.sendStatus(404));
app.use(require('./error-middleware.js'));

const server = module.exports = {};
server.isOn = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    if (!server.isOn) {
      server.http = app.listen(process.env.PORT, () =>{
        server.isOn= true;
        console.log('\nserver up on', process.env.PORT);
        resolve();
      });
      return;
    }
    reject(new Error('the server is already running'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if (server.isOn) {
      server.http.close(() => {
        server.isOn = false;
        resolve();
        console.log('\nserver shut down');
      });
      return;
    }
    reject(new Error('the server is alrady off'));
  });
};
