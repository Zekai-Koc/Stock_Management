const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const DenormalizedDevice = sequelize.define(
   "DenormalizedDevice",
   {
      imei: {
         type: DataTypes.STRING,
         allowNull: false, // Required field
         unique: true,
         primaryKey: true,
         // validate: {
         //    isNumeric: true, // Ensure only numbers
         //    len: [15, 15], // Must be exactly 15 characters long
         // },
      },
      model: {
         type: DataTypes.STRING,
         allowNull: false, // Required field
      },
      brand: {
         type: DataTypes.STRING,
         allowNull: true, // Optional field
      },
      ram: {
         type: DataTypes.INTEGER,
         allowNull: true, // Optional field
      },
      storage: {
         type: DataTypes.INTEGER,
         allowNull: true, // Optional field
      },
      color: {
         type: DataTypes.STRING,
         allowNull: true, // Optional field
      },
      grade: {
         type: DataTypes.STRING,
         allowNull: true, // Optional field
      },
      melding: {
         type: DataTypes.BOOLEAN,
         allowNull: true, // Optional field
      },
      status: {
         type: DataTypes.STRING,
         allowNull: true, // Optional field
      },
      catalog: {
         type: DataTypes.STRING,
         allowNull: true, // Optional field
      },
      purchaseDate: {
         type: DataTypes.DATE,
         allowNull: true, // Optional field
      },
      cost: {
         type: DataTypes.DECIMAL(10, 2),
         allowNull: true, // Optional field
      },
      notes: {
         type: DataTypes.TEXT,
         allowNull: true, // Optional field
      },
      active: {
         type: DataTypes.BOOLEAN,
         allowNull: true,
         defaultValue: true,
      },
   },
   {
      timestamps: false,
      tableName: "DenormalizedDevices",
   }
);

module.exports = DenormalizedDevice;
