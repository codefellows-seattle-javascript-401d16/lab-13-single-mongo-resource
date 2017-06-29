'use strict';

const {Router} = require('express');
const Student = require('../model/student-model.js');
const jsonParser = require('body-parser').json();

let studentRouter = module.exports = new Router();


studentRouter.post('/api/student', jsonParser, (req, res, next) =>{
  console.log('hit POST /api/student');

  return new Student(req.body)
  .save()
  .then(student => res.json(student))
  .catch(next);
});



studentRouter.get('/api/student/:id', (req, res, next) =>{
  console.log('hit /api/student');

  return Student.findById(req.params.id)
  .then(student => res.json(student))
  .catch(next);
});



//put
studentRouter.put('/api/student/:id', (req, res, next) =>{
  console.log('hit /api/student');
  let options ={
    runValidators: true,
    new: true,
  };
  return Student.findByIdAndUpdate(req.params.id, req.body, options)
  .then(student => res.json(student))
  .catch(next);
});

//DELETE
studentRouter.delete('/api/student/:id', (req, res, next) =>{
  console.log('hit /api/student');
  console.log(req);
  Student.findByIdAndRemove(req.params.id)
  .then(student => res.json(student))
  .catch(next);

});
