// ./models/DeviceLog.js

const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Device = require("./Device"); // Ensure this path is correct

const DeviceLog = sequelize.define(
   "DeviceLog",
   {
      deviceId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: Device, // Reference the model class directly
            key: "id",
         },
         onDelete: "CASCADE",
      },
      status: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      date: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: DataTypes.NOW,
      },
      cost: {
         type: DataTypes.DECIMAL(10, 2),
         allowNull: false,
         get() {
            const rawValue = this.getDataValue("cost");
            return parseFloat(rawValue);
         },
      },
   },
   {
      timestamps: false,
      tableName: "DeviceLogs",
   }
);

// Device.hasMany(DeviceLog, { foreignKey: "deviceId" });
// DeviceLog.belongsTo(Device, { foreignKey: "deviceId" });

module.exports = DeviceLog;

// const { DataTypes } = require("sequelize");
// const sequelize = require("../database/database");
// const Device = require("./Device");

// // Define the DeviceLog model
// const DeviceLog = sequelize.define(
//    "DeviceLog",
//    {
//       deviceId: {
//          type: DataTypes.INTEGER, // Assuming deviceId is of type STRING. Adjust if needed.
//          allowNull: false,
//          references: {
//             model: "Devices",
//             key: "id", // Assuming "imei" is the primary key in the Devices table.
//          },
//          onDelete: "CASCADE", // Automatically remove logs if the related device is deleted
//       },
//       status: {
//          type: DataTypes.STRING,
//          allowNull: false,
//       },
//       date: {
//          type: DataTypes.DATE,
//          allowNull: false,
//          defaultValue: DataTypes.NOW, // Use current date/time if not provided
//       },
//       cost: {
//          type: DataTypes.DECIMAL(10, 2),
//          allowNull: false,
//          get() {
//             const rawValue = this.getDataValue("cost");
//             return parseFloat(rawValue);
//          },
//       },
//    },
//    {
//       timestamps: false,
//       tableName: "DeviceLogs",
//    }
// );

// // Define the association
// DeviceLog.belongsTo(Device, {
//    foreignKey: "deviceId",
//    targetKey: "id",
//    as: "device", // Alias for the association
// });

// module.exports = DeviceLog;
