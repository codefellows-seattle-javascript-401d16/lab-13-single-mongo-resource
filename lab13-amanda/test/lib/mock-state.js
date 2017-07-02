'use strict';

const faker = require ('faker');
const mockIssue = require('./mock-issue.js');
const State = require ('../../model/state.js');
const mockState = module.exports = {};

mockState.createOne = () => {
  let result = {};
  return mockIssue.createOne()
  .then(issue => {
    result.issue = issue;
    return new State({
      content: faker.random.words(1),
      issue: issue._id.toString(),
    })
.save();
  })
.then(state => {
  result.state = state;
  return result;
});
};

mockState.createMany = (n) => {
  let result = {};
  return mockIssue.createOne()
  .then(issue => {
    let stateSavePromises = new Array(n).fill(0) //what does this do?
    .map(() => new State({
      content: faker.random.words(1),
      issue: issue._id.toString,
    }) .save());
    return Promise.all(stateSavePromises);
  })
.then(states => {
  result.states = states;
  return result;
});
};
