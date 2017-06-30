'use strict';

const faker = require('faker');
const Company = require('../../model/company.js');


const mockCompany = module.exports = {};

mockCompany.createOne = () => {
  return new Company({
    companyName: faker.company.companyName(2),
  })
  .save();
};

mockCompany.createMany = (n) => {
  let mockCompanyArray = new Array(n)
    .fill(0).map(() => mockCompany.createOne());
  return Promise.all(mockCompanyArray);
};
