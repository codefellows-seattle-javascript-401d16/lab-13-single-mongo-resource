'use strict';

const faker = require('faker');
const mockUsers = require('./mockUsers.js');
const Post = require('../../model/post.js');

const mockPosts = module.exports = {};

// might have to toString user._id
mockPosts.one = () => {
  let usersHolder = {};
  return mockUsers.one()
    .then((user) => {
      console.log(user._id);
      usersHolder.user = user;
      return new Post({
        phoneNumber: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        ad: faker.hacker.phrase(),
        user: user._id.toString(),
      });
    });
};

mockPosts.many = (number) => {
  let result = {};
  return mockUsers.one()
    .then((user) => {
      result.user = user;
      let postsToSave = new Array(number).fill(0).map(() => new Post({
        phoneNumber: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        ad: faker.hacker.phrase(),
        user: user.id,
      }).save());
      return Promise.all(postsToSave);
    })
    .then((posts) => {
      result.posts = posts;
      return result;
    });
};
