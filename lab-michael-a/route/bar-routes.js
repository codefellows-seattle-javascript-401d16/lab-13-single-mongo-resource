'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Bar = require('../model/bars.js');

let barRouter = module.exports = new Router();

barRouter.post('/api/bars', jsonParser, (req, res, next) => {
  // console.log('req.body^^^^^^',req.body);
  // console.log(req.body.type);
  // console.log('this is req.body!!!!',req.body);
  new Bar(req.body)
  .save()
  .then(Bar => res.json(Bar))
  .catch(next);
});


//GET ROUTES

barRouter.get('/api/bars/:id', (req, res, next) => {
  // console.log('hit get /api/bars/:id');
  // console.log(req.params.id);
  // console.log('req.status',req.status);
  Bar.findById(req.params.id)
  .then(bar => {
    res.json(bar);
    // console.log('this is the bar data',bar);
  })
  .catch(next);
});


barRouter.get('/api/bars', (req, res, next) => {
  console.log('hit /api/bars');

  let pageNumber = Number(req.query.page);
  if(!pageNumber || pageNumber < 1) pageNumber = 1;
  pageNumber--;

  Bar.find({})
  .sort({name: 'asc'})
  .skip(pageNumber * 30)
  .limit(30)
  .then(bars => res.json(bars))
  .catch(next);
});


barRouter.put('/api/bars/:id', jsonParser, (req, res, next) => {
  console.log('hit put /api/bars/:id');
  console.log('req.params in the put request',req.params);
  let options = {
    runValidators: true,
    new: true,
  };
//I noticed in class we used a cool runValidators key for the findByIdAndUpdate method... not sure if it needs to be included...
  Bar.findByIdAndUpdate(req.params.id, req.body, options)
  .then(bar => res.json(bar))
  .catch(next);
});


barRouter.delete('/api/bars/:id', (req, res, next) => {

  Bar.findByIdAndRemove(req.params.id)
  .find({})
  .then(()=> res.sendStatus(204))
  .catch(next);


});
