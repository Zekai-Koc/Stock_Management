const { DataTypes } = require("sequelize");
const sequelize = require("../database/database"); // Adjust the path to your Sequelize instance

const Storage = sequelize.define(
   "Storage",
   {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      capacity: {
         type: DataTypes.INTEGER,
         allowNull: false,
         unique: true,
      },
   },
   {
      timestamps: false, // Disable automatic timestamps if not needed
      tableName: "Storage", // Explicit table name specification
   }
);

module.exports = Storage;
