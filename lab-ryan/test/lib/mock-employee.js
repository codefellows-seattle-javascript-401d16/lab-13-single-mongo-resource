'use stict';

const faker = require('faker');
const mockEmployer = require('./mock-employer.js');
const Employee = require('../../model/employee.js');
const Employer = require('../../model/employer.js');

const mockEmployee = module.exports = {};

mockEmployee.createOne = () => {
  let result = {};
  return mockEmployer.createOne()
  .then(employer => {
    result.employer = employer;
    new Employer({
      content: faker.random.words(1),
      employer: faker.name.findName(),
    })
      .save();
  })
    .then(employee => {
      result.employee = employee;
      return result;
    });
};

mockEmployee.createMany = (n) => {
  let result = {};
  return mockEmployer.createOne()
    .then(employer => {
      result.employer = employer;
      let employeeSavePromises = new Array(n).fill(0)
      .map(() => new Employee({
        content: faker.random.words(1),
        employer: faker.name.findName(),
      }).save());
      return Promise.all(employeeSavePromises);
    })
      .then(employee => {
        result.employee = employee;
        return result;
      });
};
