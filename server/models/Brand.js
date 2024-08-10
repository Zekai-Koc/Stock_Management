const { DataTypes } = require("sequelize");
const sequelize = require("../database/database"); // Adjust the path to your Sequelize instance
// const Model = require("./Model"); // Adjust the path to your Model model

const Brand = sequelize.define(
   "Brand",
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
      tableName: "Brands", // Explicit table name specification
   }
);

// Brand.hasMany(Model, {
//    foreignKey: "brandId",
//    as: "models",
// });

module.exports = Brand;
