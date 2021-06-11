const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Recipe extends Model {}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    prepTime: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
      validate: {
        isNumeric: true,
        min: 0,
      },
      comment: "this is in minutes",
    },
    cookTime: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
      validate: {
        isNumeric: true,
        min: 0,
      },
      comment: "this is in minutes",
    },
    additionalTime: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
      validate: {
        isNumeric: true,
        min: 0,
      },
      comment: "this is in minutes",
    },
    servings: {
      type: DataTypes.STRING,
      defaultValue: 0,
      validate: {
        isNumeric: true,
        min: 0,
      },
    },
    servingSize: {
      type: DataTypes.STRING,
    },
    nutritionalInformation: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    //hooks{},
    sequelize,
    underscored: true,
    modelName: "recipe",
  }
);

module.exports = Recipe;
