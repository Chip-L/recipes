const User = require("./user");
const Recipe = require("./recipe");
const Ingredient = require("./ingredient");

User.hasMany(Recipe);
Recipe.belongsTo(User);

module.exports = { User, Ingredient, Recipe };
