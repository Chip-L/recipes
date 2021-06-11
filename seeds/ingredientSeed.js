const { Ingredient } = require("../models");

ingredientData = [
  { name: "all-purpose flour" },
  { name: "baking soda" },
  { name: "salt" },
  { name: "butter" },
  { name: "granulated sugar" },
  { name: "brown sugar" },
  { name: "vanilla extract" },
  { name: "eggs" },
  { name: "NESTLÉ® TOLL HOUSE® Semi-Sweet Chocolate Morsels" },
  { name: "chopped nuts" },
];

const seedIngredients = () => {
  Ingredient.bulkCreate(ingredientData);
};

module.exports = seedIngredients;
