const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Mobile = sequelize.define("Mobile", {
   IMEI: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true, // Set IMEI as the primary key
   },
   Model: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   Color: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   Storage: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   Grade: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   SerialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
   },
});

module.exports = Mobile;
