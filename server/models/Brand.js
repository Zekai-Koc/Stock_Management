const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Brand = sequelize.define("Brand", {
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
   },
});

module.exports = Brand;
