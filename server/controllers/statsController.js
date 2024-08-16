const { Sequelize } = require("sequelize");
const Device = require("../models/Device");
const Brand = require("../models/Brand");
const Model = require("../models/Model");
const Grade = require("../models/Grade");
const Status = require("../models/Status");
const RAM = require("../models/RAM");
const Storage = require("../models/Storage");
const Color = require("../models/Color");

const deviceStats = async (req, res) => {
   console.log("deviceStats");

   try {
      // Total count of devices
      const totalDevices = await Device.count();

      // Count devices grouped by brand name
      const devicesByBrand = await Device.findAll({
         attributes: [
            [Sequelize.col("Brand.name"), "brandName"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: Brand, attributes: [] }],
         group: ["Brand.id", "Brand.name"],
      });

      // Count devices grouped by model name
      const devicesByModel = await Device.findAll({
         attributes: [
            [Sequelize.col("Model.name"), "modelName"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: Model, attributes: [] }],
         group: ["Model.id", "Model.name"],
      });

      // Count devices grouped by status name
      const devicesByStatus = await Device.findAll({
         attributes: [
            [Sequelize.col("Status.name"), "statusName"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: Status, attributes: [] }],
         group: ["Status.id", "Status.name"],
      });

      // Count devices grouped by RAM size
      const devicesByRAM = await Device.findAll({
         attributes: [
            [Sequelize.col("RAM.name"), "ramSize"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: RAM, attributes: [] }],
         group: ["RAM.id", "RAM.name"],
      });

      // Count devices grouped by storage capacity
      const devicesByStorage = await Device.findAll({
         attributes: [
            [Sequelize.col("Storage.name"), "storage"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: Storage, attributes: [] }],
         group: ["Storage.id", "Storage.name"],
      });

      // Count devices grouped by color
      const devicesByColor = await Device.findAll({
         attributes: [
            [Sequelize.col("Color.name"), "colorName"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: Color, attributes: [] }],
         group: ["Color.id", "Color.name"],
      });

      // Count devices grouped by grade
      const devicesByGrade = await Device.findAll({
         attributes: [
            [Sequelize.col("Grade.name"), "gradeName"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: Grade, attributes: [] }],
         group: ["Grade.id", "Grade.name"],
      });

      res.json({
         totalDevices,
         devicesByBrand,
         devicesByModel,
         devicesByStatus,
         devicesByRAM,
         devicesByStorage,
         devicesByColor,
         devicesByGrade,
      });
   } catch (error) {
      console.error("Error fetching device stats:", error);
      res.status(500).send("Error fetching device stats");
   }
};

const devicesByBrand = async (req, res) => {
   console.log("getDevicesByBrand");

   try {
      // Total count of devices
      const totalDevices = await Device.count();

      // Count devices grouped by brand name
      const devicesByBrand = await Device.findAll({
         attributes: [
            [Sequelize.col("Brand.name"), "brandName"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: Brand, attributes: [] }],
         group: ["Brand.id", "Brand.name"],
      });

      res.json({
         totalDevices,
         devicesByBrand,
      });
   } catch (error) {
      console.error("Error fetching devices by brand:", error);
      res.status(500).send("Error fetching devices by brand");
   }
};

const devicesByModel = async (req, res) => {
   console.log("deviceStats");

   try {
      // Total count of devices
      const totalDevices = await Device.count();

      // Count devices grouped by model name
      const devicesByModel = await Device.findAll({
         attributes: [
            [Sequelize.col("Model.name"), "modelName"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: Model, attributes: [] }],
         group: ["Model.id", "Model.name"],
      });

      res.json({
         totalDevices,
         devicesByModel,
      });
   } catch (error) {
      console.error("Error fetching devices by model:", error);
      res.status(500).send("Error fetching devices by model");
   }
};

const devicesByStatus = async (req, res) => {
   console.log("devicesByStatus");

   try {
      // Total count of devices
      const totalDevices = await Device.count();

      // Count devices grouped by status name
      const devicesByStatus = await Device.findAll({
         attributes: [
            [Sequelize.col("Status.name"), "statusName"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: Status, attributes: [] }],
         group: ["Status.id", "Status.name"],
      });

      res.json({
         totalDevices,
         devicesByStatus,
      });
   } catch (error) {
      console.error("Error fetching devices by status:", error);
      res.status(500).send("Error fetching devices by status");
   }
};

const devicesByRam = async (req, res) => {
   console.log("deviceStats");

   try {
      // Total count of devices
      const totalDevices = await Device.count();

      // Count devices grouped by RAM size
      const devicesByRAM = await Device.findAll({
         attributes: [
            [Sequelize.col("RAM.name"), "ramSize"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: RAM, attributes: [] }],
         group: ["RAM.id", "RAM.name"],
      });

      res.json({
         totalDevices,
         devicesByRAM,
      });
   } catch (error) {
      console.error("Error fetching devices by RAM:", error);
      res.status(500).send("Error fetching devices by RAM");
   }
};

const devicesByStorage = async (req, res) => {
   console.log("devicesByStorage");

   try {
      // Total count of devices
      const totalDevices = await Device.count();

      // Count devices grouped by storage capacity
      const devicesByStorage = await Device.findAll({
         attributes: [
            [Sequelize.col("Storage.name"), "storage"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: Storage, attributes: [] }],
         group: ["Storage.id", "Storage.name"],
      });

      res.json({
         totalDevices,
         devicesByStorage,
      });
   } catch (error) {
      console.error("Error fetching devices by storage:", error);
      res.status(500).send("Error fetching devices by storage");
   }
};

const devicesByColor = async (req, res) => {
   console.log("devicesByColor");

   try {
      // Total count of devices
      const totalDevices = await Device.count();

      // Count devices grouped by color
      const devicesByColor = await Device.findAll({
         attributes: [
            [Sequelize.col("Color.name"), "colorName"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: Color, attributes: [] }],
         group: ["Color.id", "Color.name"],
      });

      res.json({
         totalDevices,
         devicesByColor,
      });
   } catch (error) {
      console.error("Error fetching devices by Color:", error);
      res.status(500).send("Error fetching devices by Color");
   }
};

const devicesByGrade = async (req, res) => {
   console.log("devicesByGrade");

   try {
      // Total count of devices
      const totalDevices = await Device.count();

      // Count devices grouped by grade
      const devicesByGrade = await Device.findAll({
         attributes: [
            [Sequelize.col("Grade.name"), "gradeName"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: Grade, attributes: [] }],
         group: ["Grade.id", "Grade.name"],
      });

      res.json({
         totalDevices,
         devicesByGrade,
      });
   } catch (error) {
      console.error("Error fetching devices by Grade:", error);
      res.status(500).send("Error fetching devices by Grade");
   }
};

module.exports = {
   deviceStats,
   devicesByBrand,
   devicesByModel,
   devicesByStatus,
   devicesByRam,
   devicesByStorage,
   devicesByColor,
   devicesByGrade,
};
