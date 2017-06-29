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

app.use(require('../route/userRouter.js'));

app.all('/api/*', (req, res, next) => {
  res.sendStatus(404);
});

app.user(require('./error-middleware.js'));


const server = module.exports = {};
server.isOn = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) {
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log('Server is up at PORT:', process.env.PORT);
        resolve();
      });
      return;
    }
    reject(new Error('Server is already Running'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(server.http && server.isOn) {
      return server.http.close(() => {
        server.isOn = false;
        console.log('Server is Off');
        resolve();
      });
    }
    reject(new Error('The Server is not Running'));
  });
};
