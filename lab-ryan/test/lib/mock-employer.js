'use strict';

const faker = require('faker');
const Employer = require('../../model/employer.js');


const mockEmployer = module.exports = {};

mockEmployer.createOne = () => {
  return new Employer({
    company: faker.company.companyName(),
    name: faker.name.findName(),
  })
  .save();
};

mockEmployer.createMany = (n) => {
  let mockEmployerArray = new Array(n)
    .fill(0).map(() => mockEmployer.createOne());
  return Promise.all(mockEmployerArray);
};
