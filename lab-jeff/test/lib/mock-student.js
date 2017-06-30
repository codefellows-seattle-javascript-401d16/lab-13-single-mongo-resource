'use strict';


const faker = require('faker');
const mockSchool = require('./mock-school.js');
const Student = require('../../model/student.js');

const mockStudent = module.exports = {};

mockStudent.createOne = () => {
  let result = {};
  return mockSchool.createOne()
  .then(school => {
    result.school = school;
    return new Student({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      school: school._id.toString(),
    })
    .save();
  })
  .then(student => {
    result.student = student;
    return result;
  });
};

mockStudent.createMany = (n) => {
  let result = {};
  return mockSchool.createOne()
  .then(school => {
    result.school = school;
    let studentSavePromises = new Array(n).fill(0)
      .map(() => new Student({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        school: school._id.toString(),
      }).save());
    return Promise.all(studentSavePromises);
  })
  .then(students => {
    result.students = students;
    return result;
  });
};
