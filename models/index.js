const User = require("./user");
const Recipe = require("./recipe");
const Ingredient = require("./ingredient");
const RecipeIngredients = require("./recipeIngredients");
const RecipeSteps = require("./recipeSteps");

User.hasMany(Recipe);
Recipe.belongsTo(User);

Recipe.belongsToMany(Ingredient, { through: RecipeIngredients });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredients });

RecipeSteps.hasMany(RecipeSteps);
RecipeSteps.belongsTo(Recipe);

module.exports = { User, Ingredient, Recipe, RecipeIngredients, RecipeSteps };
