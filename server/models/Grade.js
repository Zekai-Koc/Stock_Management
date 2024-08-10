const { DataTypes } = require("sequelize");
const sequelize = require("../database/database"); // Adjust the path to your Sequelize instance

const Grade = sequelize.define(
   "Grade",
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
      tableName: "Grades", // Explicit table name specification
   }
);

module.exports = Grade;
