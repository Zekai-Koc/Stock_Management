const { DataTypes } = require("sequelize");
const sequelize = require("../database/database"); // Adjust the path to your Sequelize instance

const StorageCapacity = sequelize.define(
   "StorageCapacity",
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
      tableName: "StorageCapacities", // Explicit table name specification
   }
);

module.exports = StorageCapacity;
