const { DataTypes } = require("sequelize");
const sequelize = require("../database/database"); // Adjust the path to your Sequelize instance

const Catalog = sequelize.define(
   "Catalog",
   {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      catalog_number: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
      },
   },
   {
      timestamps: false, // Disable automatic timestamps if not needed
      tableName: "Catalogs", // Explicit table name specification
   }
);

module.exports = Catalog;
