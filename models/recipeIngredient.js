const { Model, DataTypes } = require("sequelize");
const { Recipe, Ingredient } = require(".");
const sequelize = require("../config/connection");

class RecipeIngredient extends Model {}

RecipeIngredient.init(
  {
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
      // this is anyting from a "1 cup", "1 handful",  "1 pound", etc.
    },
    howPrepped: {
      type: DataTypes.STRING,
      allowNull: true,
      // this should be chopped, etc
    },
    recipeId: {
      type: DataTypes.INTEGER,
      references: {
        model: Recipe,
        key: "id",
        unique: false,
      },
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Ingredient,
        key: "id",
        unique: false,
      },
    },
  },
  {
    //hooks:{},
    sequelize,
    underscored: true,
    modelName: "recipeIngredient",
  }
);

module.exports = RecipeIngredient;
