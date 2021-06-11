const { User } = require("../models");

// putting these in backwards because the individual hooks clause in bulk create doesnt' garuntee the order. However, observation shows it is usually reverse order.
const userData = [
  {
    firstName: "test",
    lastName: "two",
    userName: "testtwo",
    email: "tester2@test.com",
    password: "testpass",
  },
  {
    firstName: "test",
    lastName: "one",
    userName: "testone",
    email: "tester1@test.com",
    password: "testpass",
  },
];

const seedUsers = () =>
  User.bulkCreate(userData, {
    individualHooks: true,
  });

module.exports = seedUsers;
