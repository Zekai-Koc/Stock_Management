// ./models/index.js

const sequelize = require("../database/database");

// Import models
const Device = require("./Device");
const DeviceLog = require("./DeviceLog");

// Define associations
Device.hasMany(DeviceLog, {
   foreignKey: "deviceId",
   as: "logs", // Alias for the association
});

DeviceLog.belongsTo(Device, {
   foreignKey: "deviceId",
   as: "device",
});

// Export models and sequelize instance
module.exports = {
   sequelize,
   Device,
   DeviceLog,
};
