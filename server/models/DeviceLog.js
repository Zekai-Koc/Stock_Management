const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

// Define the DeviceLog model
const DeviceLog = sequelize.define(
   "DeviceLog",
   {
      deviceId: {
         type: DataTypes.STRING, // Assuming deviceId is of type STRING. Adjust if needed.
         allowNull: false,
         references: {
            model: "DenormalizedDevices",
            key: "imei", // Assuming "imei" is the primary key in the Devices table.
         },
         onDelete: "CASCADE", // Automatically remove logs if the related device is deleted
      },
      status: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      date: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: DataTypes.NOW, // Use current date/time if not provided
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

module.exports = DeviceLog;
