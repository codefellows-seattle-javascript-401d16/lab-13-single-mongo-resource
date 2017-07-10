'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const app = express();
let server;

app.use(cors());
app.use(morgan('dev'));

app.use(require('../route/team-router.js'));
app.use(require('./error-middleware.js'));

const serverControl = module.exports = {};

serverControl.start = () => {
  return new Promise((resolve, reject) => {
    if(!server || !server.isOn){
      server = app.listen(process.env.PORT, () => {
        console.log('Logging teams on PORT:', process.env.PORT);
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
    if(server && server.isOn){
      server.close(() => {
        console.log('server shut down');
        server.isOn = false;
        resolve();
      });
      return;
    }
    reject();
  });
};
