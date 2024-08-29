// ./models/Device.js

const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Device = sequelize.define(
   "Device",
   {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         allowNull: false,
         primaryKey: true,
      },
      imei: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      model: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      brand: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      ram: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },
      storage: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },
      color: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      grade: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      melding: {
         type: DataTypes.BOOLEAN,
         allowNull: true,
      },
      status: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      catalog: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      purchaseDate: {
         type: DataTypes.DATE,
         allowNull: true,
      },
      cost: {
         type: DataTypes.DECIMAL(10, 2),
         allowNull: true,
      },
      notes: {
         type: DataTypes.TEXT,
         allowNull: true,
      },
      active: {
         type: DataTypes.BOOLEAN,
         allowNull: true,
         defaultValue: true,
      },
   },
   {
      timestamps: false,
      tableName: "Devices",
   }
);

module.exports = Device;