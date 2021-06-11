const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class RecipeIngredients extends Model {}

RecipeIngredients.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
      // this is anyting from a handful, 1pound, etc.
    },
    howPrepped: {
      type: DataTypes.STRING,
      allowNull: true,
      // this should be chopped, etc
    },
    recipeId: {
      type: DataTypes.INTEGER,
    },
    ingredientId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    //hooks:{},
    sequelize,
    underscored: true,
    modelName: "recipeIngredients",
  }
);

module.exports = RecipeIngredients;
