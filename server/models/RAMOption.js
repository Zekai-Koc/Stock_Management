const { DataTypes } = require("sequelize");
const sequelize = require("../database/database"); // Adjust the path to your Sequelize instance

const RAMOption = sequelize.define(
   "RAMOption",
   {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      size: {
         type: DataTypes.INTEGER,
         allowNull: false,
         unique: true,
      },
   },
   {
      timestamps: false, // Disable automatic timestamps if not needed
      tableName: "RAMOptions", // Explicit table name specification
   }
);

module.exports = RAMOption;
