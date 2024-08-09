const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Ram = sequelize.define("Ram", {
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

module.exports = Ram;
