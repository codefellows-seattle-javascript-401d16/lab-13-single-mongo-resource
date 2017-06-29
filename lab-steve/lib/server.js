'use strict';

//NPM Modules
const express = require('express');
const mongoose = require('mongoose');

//NPM Middleware
const cors = require('cors');
const morgan = require('morgan');

//configure Mongoose
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) {
    console.log('Unable to connect. Start mongod first. Error:', err);
  } else {
    console.log('Connected to Mongo database');
  }
});

//instantiate server and app
let server;
const app = express();

//add Middleware
app.use(cors());
app.use(morgan('dev'));

//tell app to use ../route/hops-routerjs and ./error-middleware.js
app.use(require('../route/router.js'));
app.use(require('./error-middleware.js'));

//export server and server controls
const serverControl = module.exports = {};

serverControl.start = () => {
  return new Promise((resolve) => {
    server = app.listen(process.env.PORT, () => {
      console.log('server up', process.env.PORT);
      server.isOn = true;
      resolve();
    });
  });
};

serverControl.stop = () => {
  return new Promise((resolve) => {
    server.close(() => {
      console.log('server down');
      server.isOn = false;
      resolve();
    });
  });
};
