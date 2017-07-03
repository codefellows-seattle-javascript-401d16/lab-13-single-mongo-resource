'use strict';

const jsonParser = require('body-parser').json();
const emoloyeeRouter = module.exports = new require('express').Router();

const Employee = require('../model/employee.js');

employeeRouter.post('/api/employees', jsonParser, (req, res, next) => {
  console.log('hit POST /api/employees');


  new Employee(req.body)
.save()
.then(employee => res.json(employee))
.catch(next);
});

crewRouter.put('/api/crews/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/employees/:id');
  let options = {
    new: true,
    runValidators: true,
  };
  Employee.findByIdAndUpdate(req.params.id, req.body, options)
  .then(employee => res.json(employee))
  .catch(next);
});
