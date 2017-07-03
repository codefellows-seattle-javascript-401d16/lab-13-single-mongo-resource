'use strict';

const jsonParser = require('body-parser').json();
const photoRouter = (module.exports = new require('express').Router());

const Photo = require('../model/photo.js');

photoRouter.post('/api/photos', jsonParser, (req, res, next) => {
  new Photo(req.body).save().then(photo => res.json(photo)).catch(next);
});

photoRouter.put('/api/photos/:id', jsonParser, (req, res, next) => {
  Photo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(photo => res.json(photo))
    .catch(next);
});

photoRouter.get('/api/photos/:id', (req, res, next) => {
  Photo.findById(req.params.id).then(photo => res.json(photo)).catch(next);
});

photoRouter.delete('/api/photos/:id', (req, res, next) => {
  Photo.findByIdAndRemove(req.params.id).then(res.sendStatus(204)).catch(next);
});
