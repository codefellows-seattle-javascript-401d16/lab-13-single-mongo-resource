'use strict';

const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(require('../route/team-router.js'));
app.use(require('./error-middleware.js'));

app.all('/api/*', (req, res, next) => {
  res.sendStatus(404);
});

const serverControler = module.exports = {};

serverControler.start = () => {
  return new Promise((resolve, reject) => {
    if(!serverControler.isOn) {
      serverControler.http = app.listen(process.env.PORT, () => {
        console.log('server up', process.env.PORT);
        serverControler.isOn = true;
        resolve();
      });
      return;
    }
    reject(new Error('already up'));
  });
};


serverControler.stop = () => {
  return new Promise((resolve, reject) => {
    if(serverControler.http && serverControler.isOn) {
      return serverControler.close(() => {
        console.log('server down');
        serverControler.isOn = false;
        resolve();
      });
    }
    reject(new Error('server is down'));
  });
};
