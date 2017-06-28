'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const app = express();
let server;

// middleware
app.use(cors());
app.use(morgan('dev'));
//  routes
app.use(require('../route/team-router.js'));
// error middleware
app.use(require('./error-middleware.js'));

const serverControl = module.exports = {};

serverControl.start = () => {
  return new Promise((resolve, reject) => {
    if(!server || !server.isOn) {
      server = app.listen(process.env.PORT, () =>{
        console.log('Server is now up on port: ', process.env.PORT);
        server.isOn = true;
        resolve();
      });
      return;
    }
    reject();
  });
};

serverControl.stop = () => {
  return new Promise((resolve, reject) => {
    if(server && server.isOn) {
      server.close(() => {
        console.log('Server is now offline');
        server.isOn = false;
        resolve();
      });
      return;
    }
    reject();
  });
};
