const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Storage = sequelize.define("Storage", {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   value: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
   },
});

module.exports = Storage;
