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

// const { DataTypes } = require("sequelize");
// const sequelize = require("../database/database");
// const DeviceLog = require("./DeviceLog");

// const Device = sequelize.define(
//    "Device",
//    {
//       id: {
//          type: DataTypes.INTEGER,
//          autoIncrement: true, // Auto-incrementing field
//          allowNull: false,
//          primaryKey: true, // Set as the primary key
//       },
//       imei: {
//          type: DataTypes.STRING,
//          allowNull: true, // Required field
//          // unique: true,
//          // primaryKey: true,
//          // validate: {
//          //    isNumeric: true, // Ensure only numbers
//          //    len: [15, 15], // Must be exactly 15 characters long
//          // },
//       },
//       model: {
//          type: DataTypes.STRING,
//          allowNull: false, // Required field
//       },
//       brand: {
//          type: DataTypes.STRING,
//          allowNull: true, // Optional field
//       },
//       ram: {
//          type: DataTypes.INTEGER,
//          allowNull: true, // Optional field
//       },
//       storage: {
//          type: DataTypes.INTEGER,
//          allowNull: true, // Optional field
//       },
//       color: {
//          type: DataTypes.STRING,
//          allowNull: true, // Optional field
//       },
//       grade: {
//          type: DataTypes.STRING,
//          allowNull: true, // Optional field
//       },
//       melding: {
//          type: DataTypes.BOOLEAN,
//          allowNull: true, // Optional field
//       },
//       status: {
//          type: DataTypes.STRING,
//          allowNull: true, // Optional field
//       },
//       catalog: {
//          type: DataTypes.STRING,
//          allowNull: true, // Optional field
//       },
//       purchaseDate: {
//          type: DataTypes.DATE,
//          allowNull: true, // Optional field
//       },
//       cost: {
//          type: DataTypes.DECIMAL(10, 2),
//          allowNull: true, // Optional field
//       },
//       notes: {
//          type: DataTypes.TEXT,
//          allowNull: true, // Optional field
//       },
//       active: {
//          type: DataTypes.BOOLEAN,
//          allowNull: true,
//          defaultValue: true,
//       },
//    },
//    {
//       timestamps: false,
//       tableName: "Devices",
//    }
// );

// // Define the association
// Device.hasMany(DeviceLog, {
//    foreignKey: "deviceId",
//    sourceKey: "id",
//    as: "logs", // Alias for the association
// });

// module.exports = Device;
