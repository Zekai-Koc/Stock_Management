const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Status = sequelize.define("Status", {
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

module.exports = Status;
