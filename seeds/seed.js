const sequelize = require("../config/connection");
const seedIngredients = require("./ingredientSeed");
const seedRecipes = require("./recipeSeed");
const seedUsers = require("./userSeed");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  await seedRecipes();
  await seedIngredients();
};

seedAll();
