'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Company = require('../model/company.js');

let companyRouter = module.exports = new Router();

companyRouter.post('/api/company', jsonParser, (req, res, next) => {
  console.log('hit /api/company');
  new Company(req.body)
    .save()
    .then(company => res.json(company))
    .catch(next);
});
companyRouter.get('/api/company',(req, res, next) => {
  Company.find({})
    .then(company => res.json(company))
    .catch(next);

});
companyRouter.get('/api/company/:id', (req, res, next) => {
  console.log('hit get /api/company/:id');
  Company.findById(req.params.id)
    .then(company => res.json(company))
    .catch(next);
});
companyRouter.put('/api/company/:id', jsonParser, (req, res, next) => {
  Company.update({_id: req.params.id}, {companyName: req.body.companyName, products: req.body.products})
    .then(() => res.json(req.body)) // because update doesnt return the updated record
    .catch(next);
});

companyRouter.delete('/api/company/:id', (req, res, next) => {
  Company.deleteOne({_id: req.params.id})
    .then(() => res.sendStatus(200))
    .catch(next);
});
