const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Model = require("./Model");
const Color = require("./Color");
const Grade = require("./Grade");
const Ram = require("./Ram");
const Storage = require("./Storage");
const Status = require("./Status");
const Brand = require("./Brand");

const Device = sequelize.define("Device", {
   imei: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
   },
   serial_number: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   ram_id: {
      type: DataTypes.INTEGER,
      references: {
         model: Ram,
         key: "id",
      },
   },
   storage_capacity_id: {
      type: DataTypes.INTEGER,
      references: {
         model: Storage,
         key: "id",
      },
   },
   purchase_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
   },
   status_id: {
      type: DataTypes.INTEGER,
      references: {
         model: Status,
         key: "id",
      },
   },
   model_id: {
      type: DataTypes.INTEGER,
      references: {
         model: Model,
         key: "id",
      },
   },
   color_id: {
      type: DataTypes.INTEGER,
      references: {
         model: Color,
         key: "id",
      },
   },
   grade_id: {
      type: DataTypes.INTEGER,
      references: {
         model: Grade,
         key: "id",
      },
   },
   brand_id: {
      type: DataTypes.INTEGER,
      references: {
         model: Brand,
         key: "id",
      },
   },
   notes: {
      type: DataTypes.TEXT,
   },
});

Device.belongsTo(Model, { foreignKey: "model_id", onDelete: "CASCADE" });
Device.belongsTo(Color, { foreignKey: "color_id", onDelete: "CASCADE" });
Device.belongsTo(Grade, { foreignKey: "grade_id", onDelete: "CASCADE" });
Device.belongsTo(Ram, { foreignKey: "ram_id", onDelete: "CASCADE" });
Device.belongsTo(Storage, {
   foreignKey: "storage_id",
   onDelete: "CASCADE",
});
Device.belongsTo(Status, { foreignKey: "status_id", onDelete: "CASCADE" });
Device.belongsTo(Brand, { foreignKey: "brand_id", onDelete: "CASCADE" });

module.exports = Device;
