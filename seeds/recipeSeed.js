const { Recipe } = require("../models");

const recipeData = [
  {
    recipeName: "Original NESTLÉ® TOLL HOUSE® Chocolate Chip Cookies",
    description:
      "Yummy cookies that Mom used to make. The recipe is from the back of the chocolate chip bag.",
    prepTime: 15,
    cookTime: 9,
    servings: "5 dozen cookies",
    userId: 1,
  },
];

const seedRecipes = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipes;
