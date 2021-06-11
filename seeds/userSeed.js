const { User } = require("../models");

// putting these in backwards because the individual hooks clause in bulk create doesnt' garuntee the order. However, observation shows it is usually reverse order.
const userData = [
  {
    first_name: "test",
    last_name: "two",
    username: "testtwo",
    email: "tester2@test.com",
    password: "testpass",
  },
  {
    first_name: "test",
    last_name: "one",
    username: "testone",
    email: "tester1@test.com",
    password: "testpass",
  },
];

const seedUsers = () =>
  User.bulkCreate(userData, {
    individualHooks: true,
  });

module.exports = seedUsers;
