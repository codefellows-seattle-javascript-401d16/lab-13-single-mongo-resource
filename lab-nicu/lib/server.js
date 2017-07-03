'use strict';

//npm modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL);

let app = new express();
let server = module.exports = {};

app.use(cors());
app.use(morgan('dev'));
app.use(require('../route/burger-joint-routes.js'));
app.use(require('./error-route-handler.js'));
app.all('/api/*', (req, res, next) =>{
  res.sendStatus(404);
});

server.isOn = false;

server.start = () => {
  return new Promise(resolve => {
    server.http = app.listen(process.env.PORT, () => {
      console.log('Listening in port ', process.env.PORT);
      server.isOn = true;
      resolve();
    });
  });
};

server.stop = () => {
  return new Promise(resolve => {
    if (server.http && server.isOn) {
      server.http.close(() => {
        console.log('stopping server');
        server.isOn = false;
        resolve();
      });
    }
  });
};