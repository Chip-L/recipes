const User = require("./user");
const Recipe = require("./recipe");
const Ingredient = require("./ingredient");
const RecipeIngredient = require("./recipeIngredient");
const RecipeSteps = require("./recipeSteps");

User.hasMany(Recipe);
Recipe.belongsTo(User);

Recipe.belongsToMany(Ingredient, { through: RecipeIngredient, unique: false });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredient, unique: false });

RecipeSteps.hasMany(RecipeSteps);
RecipeSteps.belongsTo(Recipe);

module.exports = { User, Ingredient, Recipe, RecipeIngredient, RecipeSteps };
