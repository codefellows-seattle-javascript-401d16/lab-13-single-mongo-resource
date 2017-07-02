'use strict';

const faker = require('faker');
const Issue = require('../../model/issue.js');

const mockIssue= module.exports = {};

mockIssue.createOne = () => {
  return new Issue({
    building: `${faker.company.companyName(2)}`,
    room: `${faker.random.number(3)}`,
    timestamp: `${faker.date.recent}`,
    type: mockIssue.randomIssueType(),
  })
  .save();
};

mockIssue.createMany = (n) => {
  let mockIssueArray = new Array(n)
  .fill(0).map(() => mockIssue.createOne()); // what does this do?
  return Promise.all(mockIssueArray);
};

mockIssue.randomeIssueType = () => {
  let types = ['Fire', 'Water', 'BioHazard', 'Electric', 'Structure', 'Radiation', 'Medical Gas', 'Death'];
  return types[Math.floor(Math.random()*((types.length -1)))];
};


// const issueSchema = mongoose.Schema({
//   building: {type: String, required: true},
//   room: {type: String, required: true},
//   issues: [{type: mongoose.Schema.Types.ObjectId, ref: 'issue'}],
//   timestamp: {type: Date, default: Date.now},
//
// });
