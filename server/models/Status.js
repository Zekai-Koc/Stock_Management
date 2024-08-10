const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Status = sequelize.define(
   "Status",
   {
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
   },
   {
      timestamps: false, // Disable automatic timestamps if not needed
      tableName: "Statuses", // Explicit table name specification
   }
);

module.exports = Status;
