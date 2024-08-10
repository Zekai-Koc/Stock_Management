const { Sequelize } = require("sequelize");
// const { Device, Brand, Model, Status } = require("../models");
const {
   Device,
   Brand,
   Model,
   Status,
   RAM,
   Storage,
   Color,
   Grade,
} = require("../models");

// Read all mobiles
const getAllDevices = async (req, res) => {
   console.log("getAllDevices");
   try {
      const devices = await Device.findAll();
      res.json({
         count: devices.length,
         devices,
      });
   } catch (error) {
      console.error("Error fetching Devices:", error);
      res.status(500).send("Error fetching Devices");
   }
};

// Read a specific Device by IMEI
const getDevice = async (req, res) => {
   console.log("getDevice");
   const { IMEI } = req.params;

   try {
      // Find the device by IMEI
      const device = await Device.findOne({ where: { imei: IMEI } });

      if (device) {
         // If device is found, return it as a JSON response
         res.json(device);
      } else {
         // If device is not found, send a 404 response
         res.status(404).send("Device not found");
      }
   } catch (error) {
      // Handle any errors that occur during the query
      console.error("Error fetching Device:", error);
      res.status(500).send("Error fetching Device");
   }
};

// Create a new Device
const createDevice = async (req, res) => {
   console.log("createDevice");

   const {
      imei,
      brandId,
      modelId,
      ramId,
      storageId,
      colorId,
      gradeId,
      statusId,
      melding,
      catalogId,
      purchaseDate,
   } = req.body;

   try {
      // Validate request body
      if (
         !imei ||
         !brandId ||
         !modelId ||
         !ramId ||
         !storageId ||
         !colorId ||
         !gradeId ||
         !statusId ||
         !melding ||
         !catalogId ||
         !purchaseDate
      ) {
         return res.status(400).send("Missing required fields");
      }

      // Create the new device
      const newDevice = await Device.create({
         imei,
         brandId,
         modelId,
         ramId,
         storageId,
         colorId,
         gradeId,
         statusId,
         melding,
         catalogId,
         purchaseDate,
      });

      res.status(201).json({
         status: "success",
         data: {
            device: newDevice,
         },
      });
   } catch (error) {
      console.error("Error adding Device:", error);
      res.status(500).send("Error adding Device");
   }
};

// Update a Device by IMEI
const updateDevice = async (req, res) => {
   const { IMEI } = req.params;
   const {
      brandId,
      modelId,
      ramId,
      storageId,
      colorId,
      gradeId,
      statusId,
      melding,
      catalogId,
      purchaseDate,
   } = req.body;

   try {
      // Find the device by IMEI
      const device = await Device.findOne({ where: { imei: IMEI } });
      if (device) {
         // Update the device with all provided values
         await device.update({
            brandId,
            modelId,
            ramId,
            storageId,
            colorId,
            gradeId,
            statusId,
            melding,
            catalogId,
            purchaseDate,
         });
         res.send("Device updated successfully");
      } else {
         res.status(404).send("Device not found");
      }
   } catch (error) {
      console.error("Error updating Device:", error);
      res.status(500).send("Error updating Device");
   }
};

// Delete a Device by IMEI
const deleteDevice = async (req, res) => {
   console.log("deleteDevice");

   const { IMEI } = req.params;

   try {
      // Attempt to delete the device by IMEI
      const rowsDeleted = await Device.destroy({ where: { imei: IMEI } });
      if (rowsDeleted) {
         res.send("Device deleted successfully");
      } else {
         res.status(404).send("Device not found");
      }
   } catch (error) {
      console.error("Error deleting Device:", error);
      res.status(500).send("Error deleting Device");
   }
};

const checkID = async (req, res, next, val) => {
   console.log(`Device id is: ${val}`);
   next();
};

const checkBody = async (req, res, next) => {
   console.log("Checking body");
   next();
};

const getDeviceStats = async (req, res) => {
   try {
      // Total count of devices
      const totalDevices = await Device.count();

      // Count devices grouped by brand name
      const devicesByBrand = await Device.findAll({
         attributes: [
            // [Sequelize.col("Brand.id"), "brandId"],
            [Sequelize.col("Brand.name"), "brandName"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: Brand, attributes: [] }],
         group: ["Brand.id", "Brand.name"],
      });

      // Count devices grouped by model name
      const devicesByModel = await Device.findAll({
         attributes: [
            // [Sequelize.col("Model.id"), "modelId"],
            [Sequelize.col("Model.name"), "modelName"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: Model, attributes: [] }],
         group: ["Model.id", "Model.name"],
      });

      // Count devices grouped by status name
      const devicesByStatus = await Device.findAll({
         attributes: [
            // [Sequelize.col("Status.id"), "statusId"],
            [Sequelize.col("Status.name"), "statusName"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: Status, attributes: [] }],
         group: ["Status.id", "Status.name"],
      });

      // Count devices grouped by RAM size
      const devicesByRAM = await Device.findAll({
         attributes: [
            // [Sequelize.col("RAM.id"), "ramId"],
            [Sequelize.col("RAM.size"), "ramSize"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: RAM, attributes: [] }],
         group: ["RAM.id", "RAM.size"],
      });

      // Count devices grouped by storage capacity
      const devicesByStorage = await Device.findAll({
         attributes: [
            // [Sequelize.col("Storage.id"), "storageId"],
            [Sequelize.col("Storage.capacity"), "storage"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: Storage, attributes: [] }],
         group: ["Storage.id", "Storage.capacity"],
      });

      // Count devices grouped by color
      const devicesByColor = await Device.findAll({
         attributes: [
            // [Sequelize.col("Color.id"), "colorId"],
            [Sequelize.col("Color.name"), "colorName"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: Color, attributes: [] }],
         group: ["Color.id", "Color.name"],
      });

      // Count devices grouped by grade
      const devicesByGrade = await Device.findAll({
         attributes: [
            // [Sequelize.col("Grade.id"), "gradeId"],
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

module.exports = {
   getAllDevices,
   getDevice,
   createDevice,
   updateDevice,
   deleteDevice,
   checkID,
   checkBody,
   getDeviceStats,
};
