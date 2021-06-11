const User = require("./user");
const Recipe = require("./recipe");
const Ingredient = require("./ingredient");
const RecipeIngredients = require("./recipeIngredients");

User.hasMany(Recipe);
Recipe.belongsTo(User);

Recipe.belongsToMany(Ingredient, { through: RecipeIngredients });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredients });

module.exports = { User, Ingredient, Recipe, RecipeIngredients };
