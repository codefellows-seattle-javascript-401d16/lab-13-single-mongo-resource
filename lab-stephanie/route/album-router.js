'use strict';

const jsonParser = require('body-parser').json();
const albumRouter = (module.exports = new require('express').Router());

const PhotoAlbum = require('../model/album.js');

albumRouter.post('/api/albums', jsonParser, (req, res, next) => {
  console.log('hit POST /api/albums');
  new PhotoAlbum(req.body).save().then(album => res.json(album)).catch(next);
});

albumRouter.get('/api/albums/:id', (req, res, next) => {
  console.log('hit GET /api/albums/:id');

  PhotoAlbum.findById(req.params.id).then(album => res.json(album)).catch(next);
});

albumRouter.get('/api/albums', (req, res, next) => {
  console.log('hit /api/albums');

  let pageNumber = Number(req.query.page);
  if (!pageNumber || pageNumber < 1) pageNumber = 1;
  pageNumber--;

  PhotoAlbum.find({})
    .sort({ title: 'asc' })
    .skip(pageNumber * 50)
    .limit(50)
    .then(albums => res.json(albums))
    .catch(next);
});

albumRouter.put('/api/albums/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/albums/:id');

  PhotoAlbum.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(album => res.json(album))
    .catch(next);
});

albumRouter.delete('/api/albums/:id', (req, res, next) => {
  console.log('hit DELETE /api/albums/:id');

  PhotoAlbum.findByIdAndRemove(req.params.id)
    .then(res.sendStatus(204))
    .catch(next);
});
