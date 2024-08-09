const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Brand = require("./Brand");

const Model = sequelize.define("Model", {
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false,
   },
});

Model.belongsTo(Brand, { foreignKey: "brand_id", onDelete: "CASCADE" });

module.exports = Model;
