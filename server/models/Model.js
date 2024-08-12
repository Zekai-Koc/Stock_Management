const { DataTypes } = require("sequelize");
const sequelize = require("../database/database"); // Adjust the path to your Sequelize instance
const Brand = require("./Brand"); // Adjust the path to your Brand model
// const Device = require("./Device"); // Adjust the path to your Device model

const Model = sequelize.define(
   "Model",
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
      brandId: {
         type: DataTypes.INTEGER,
         references: {
            model: Brand,
            key: "id",
         },
         allowNull: false,
      },
   },
   {
      timestamps: false, // Disable automatic timestamps if not needed
      tableName: "Models", // Explicit table name specification
   }
);

Model.belongsTo(Brand, {
   foreignKey: "brandId",
   as: "brand",
});

module.exports = Model;
