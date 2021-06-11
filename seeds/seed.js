const sequelize = require("../config/connection");
const seedUsers = require("./userSeed");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
};

seedAll();
