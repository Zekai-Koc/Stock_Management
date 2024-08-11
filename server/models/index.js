// models/index.js

const sequelize = require("../database/database");
const Brand = require("./Brand");
const Device = require("./Device");
const Model = require("./Model");
const Status = require("./Status");
const RAM = require("./RAM");
const Storage = require("./Storage");
const Color = require("./Color");
const Grade = require("./Grade");
const Catalog = require("./Catalog");

// Define associations
Brand.hasMany(Device, { foreignKey: "brandId" });
Device.belongsTo(Brand, { foreignKey: "brandId" });

Model.hasMany(Device, { foreignKey: "modelId" });
Device.belongsTo(Model, { foreignKey: "modelId" });

Status.hasMany(Device, { foreignKey: "statusId" });
Device.belongsTo(Status, { foreignKey: "statusId" });

RAM.hasMany(Device, { foreignKey: "ramId" });

Storage.hasMany(Device, { foreignKey: "storageId" });

Color.hasMany(Device, { foreignKey: "colorId" });

Grade.hasMany(Device, { foreignKey: "gradeId" });

Catalog.hasMany(Device, { foreignKey: "catalogId" });

// Export all models and sequelize instance
module.exports = {
   // sequelize,
   Brand,
   Device,
   Model,
   Status,
   RAM,
   Storage,
   Color,
   Grade,
   Catalog,
};
