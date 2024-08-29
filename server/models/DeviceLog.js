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