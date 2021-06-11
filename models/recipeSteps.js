const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class RecipeSteps extends Model {}

RecipeSteps.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    step: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 0,
      },
    },
    desciption: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    // hooks: {},
    sequelize,
    underscored: true,
    modelName: "recipeSteps",
  }
);

module.exports = RecipeSteps;
