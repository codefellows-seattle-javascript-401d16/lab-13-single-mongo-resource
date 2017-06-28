'use strict';

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');


mongoose.Promise = Promise;

const app = express();
app.use(morgan('dev'));

app.use(require('../route/recipe-route.js'));

app.all('/api/*', (req, res) => {
  res.sendStatus(404);
});

app.use(require('./error-middleware.js'));

module.exports = {
  isOn: false,
  start: () => {
    return new Promise((resolve, reject) => {
      if(this.isOn) {
        reject(new Error('server already running'));
      }
      this.http = app.listen(process.env.PORT, (err) => {
        if(err) reject(err);
        this.isOn = true;
        console.log(`Recipe server running on port ${process.env.PORT}`);
        resolve();
      });
    })
    .then(() => mongoose.connect(process.env.MONGODB_URI));
  },

  stop: () => {
    return new Promise((resolve, reject) => {
      if(!(this.http && this.isOn)) {
        reject(new Error('server not running'));
      }
      this.isOn = false;
      console.log(`Recipe server on port ${process.env.PORT} stopping`);
      this.http.close((err) => {
        if(err) reject(err);
        this.isOn = false;
        console.log('Server stopped.');
        resolve();
      });
    })
    .then(() => mongoose.disconnect());
  },
};
