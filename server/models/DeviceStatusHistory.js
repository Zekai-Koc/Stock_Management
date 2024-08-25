const { DataTypes } = require("sequelize");
const sequelize = require("../database/database"); // Adjust the path to your Sequelize instance
const Device = require("./Device");
const Status = require("./Status");

const DeviceStatusHistory = sequelize.define(
   "DeviceStatusHistory",
   {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      deviceId: {
         type: DataTypes.INTEGER,
         references: {
            model: Device,
            key: "imei",
         },
         allowNull: false,
      },
      statusId: {
         type: DataTypes.INTEGER,
         references: {
            model: Status,
            key: "id",
         },
         allowNull: false,
      },
      changeDate: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: DataTypes.NOW,
      },
      cost: {
         type: DataTypes.DECIMAL(10, 2),
         allowNull: true,
      },
   },
   {
      timestamps: false,
      tableName: "DeviceStatusHistory",
   }
);

// Define the relationships
// Device.hasMany(DeviceStatusHistory, { foreignKey: "deviceId" });
// DeviceStatusHistory.belongsTo(Device, { foreignKey: "deviceId" });

// Status.hasMany(DeviceStatusHistory, { foreignKey: "statusId" });
// DeviceStatusHistory.belongsTo(Status, { foreignKey: "statusId" });

module.exports = DeviceStatusHistory;
