'use strict';

const faker = require('faker');
const Student = require('../../model/student-model.js');

const mockStudent = module.exports = {};

mockStudent.createOne = () => {
  return new Student({
    studentId: faker.random.number(),
    name: faker.name.findName(),
    class: 401,
    grade: 89,
    gender: 'female',
    race: 'yapanese',
  });
};
