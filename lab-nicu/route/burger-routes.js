'use strict';

const burgerRouter = module.exports = require('express').Router();
const bodyParser = require('body-parser').json();
const Burger = require('../model/burger.js');

burgerRouter.post('/api/burger', bodyParser, (req, res, next) =>{
  new Burger(req.body)
    .save()
    .then(burger => res.json(burger))
    .catch(next);
});

burgerRouter.get('/api/burger/:id', bodyParser, (req, res, next) =>{
  Burger.findById(req.params.id)
    .then(burger => res.json(burger))
    .catch(next);
});

burgerRouter.put('/api/burger/:id', bodyParser, (req, res, next) =>{
  Burger.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
    .then(burger => res.json(burger))
    .catch(next);
});

burgerRouter.delete('/api/burger/:id', bodyParser, (req, res, next) =>{
  Burger.findByIdAndRemove(req.params.id)
    .then(burger => res.sendStatus(204))
    .catch(next);
});