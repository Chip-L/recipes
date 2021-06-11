const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Ingredient extends Model {}

Ingredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // picture not a column here. This will require a table so that an ingredient belongs to many pictures
  },
  {
    sequelize,
    underscored: true,
    modelName: "ingredient",
  }
);

module.exports = Ingredient;
