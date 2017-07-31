'use strict';

const faker = require('faker');
const Issue = require('../../model/issue.js');

const mockIssue = module.exports = {};

mockIssue.createOne = () => {
  return new Issue({
    building: `${faker.company.companyName(2)}`,
    room: `${faker.random.number(3)}`,
    type: mockIssue.randomIssueType(),
  })
  .save();
};

mockIssue.createMany = (n) => {
  let mockIssueArray = new Array(n);
  console.log('mock Array', Array)
  .fill(0).map(() => mockIssue.createOne()); // what does this do?
  return Promise.all(mockIssueArray);
};

mockIssue.randomIssueType = () => {
  let types = ['Fire', 'Water', 'BioHazard', 'Electric', 'Structure', 'Radiation', 'Medical Gas', 'Death'];
  return types[Math.floor(Math.random()*((types.length -1)))];
};
