'use strict';

const faker = require('faker');
const Member = require('../../model/member.js');


const mockMember = module.exports = {};

mockMember.createOne = () => {
  return new Member({
    firstName: faker.random.words(1),
    lastName: faker.random.words(1),
    availabilityDate: ['07/02/2017', '07/09/2017'],
  })
  .save();
};

mockMember.createMany = (n) => {
  let mockMemberArray = new Array(n)
    .fill(0).map(() => mockMember.createOne());
  return Promise.all(mockMemberArray);
};
