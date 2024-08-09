const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Grade = sequelize.define("Grade", {
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

module.exports = Grade;
