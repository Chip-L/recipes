const sequelize = require("../config/connection");
const seedIngredients = require("./ingredientSeed");
const seedUsers = require("./userSeed");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  await seedIngredients();
};

seedAll();
