'use strict';

const jsonParser = require('body-parser').json();
const bikeShopRouter = module.exports = new require('express').Router();

const BikeShop = require('../model/bike-shop.js');

bikeShopRouter.post('/api/bikeShops', jsonParser, (req, res, next) => {

  new BikeShop(req.body)
  .save()
  .then(shop => res.json(shop))
  .catch(next);
});

bikeShopRouter.get('/api/bikeShops/:id', (req, res, next) => {

  BikeShop.findById(req.params.id)
  .then(shop => res.json(shop))
  .catch(next);
});

bikeShopRouter.put('/api/bikeShops/:id', jsonParser, (req, res, next) => {

  let options = {
    runValidators: true,
    new: true,
  };

  BikeShop.findByIdAndUpdate(req.params.id, req.body, options)
  .then(shop => res.json(shop))
  .catch(next);
});

bikeShopRouter.delete('/api/bikeShops/:id', (req, res, next) => {

  BikeShop.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
