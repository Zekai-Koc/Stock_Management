const { Op, fn, col } = require("sequelize"); // Import necessary functions from sequelize
const sequelize = require("../database/database");
const Device = require("../models/Device");
const DeviceLog = require("../models/DeviceLog");

// Get all devices
const getDevices = async (req, res) => {
   try {
      const devices = await Device.findAll();
      return res.status(200).json(devices);
   } catch (error) {
      return res
         .status(500)
         .json({ message: "Error retrieving devices", error });
   }
};

// Get a single device by IMEI
const getDevice = async (req, res) => {
   try {
      const imei = req.params.imei;
      const device = await Device.findOne({ where: { imei } });
      if (!device) {
         return res.status(404).json({ error: "Device not found" });
      }
      const logs = await DeviceLog.findAll({ where: { deviceId: imei } });
      console.log("Device logs:", logs);
      res.json({ device, logs });
   } catch (error) {
      console.error("Error fetching device details:", error);
      res.status(500).json({ error: "Internal server error" });
   }
};

// Create a new device
const createDevice = async (req, res) => {
   const {
      imei,
      model,
      brand,
      ram,
      storage,
      color,
      grade,
      melding,
      status,
      catalog,
      purchaseDate,
      cost,
      notes,
      active,
   } = req.body;

   try {
      const newDevice = await Device.create({
         imei,
         model,
         brand,
         ram,
         storage,
         color,
         grade,
         melding,
         status,
         catalog,
         purchaseDate,
         cost,
         notes,
         active,
      });

      return res.status(201).json(newDevice);
   } catch (error) {
      return res.status(500).json({ message: "Error creating device", error });
   }
};

// Update an existing device by IMEI
const updateDevice = async (req, res) => {
   const { imei } = req.params;
   const updates = req.body; // The updated fields sent in the request

   try {
      const device = await Device.findOne({ where: { imei } });

      if (!device) {
         return res.status(404).json({ message: "Device not found" });
      }

      // Update the device with the new data
      await device.update(updates);

      return res.status(200).json(device);
   } catch (error) {
      return res.status(500).json({ message: "Error updating device", error });
   }
};

// Delete a device by IMEI
const deleteDevice = async (req, res) => {
   const { imei } = req.params;

   try {
      const device = await Device.findOne({ where: { imei } });

      if (!device) {
         return res.status(404).json({ message: "Device not found" });
      }

      await device.destroy();
      return res.status(200).json({ message: "Device deleted successfully" });
   } catch (error) {
      return res.status(500).json({ message: "Error deleting device", error });
   }
};

const bulkCreateDevices = async (req, res) => {
   try {
      const devices = req.body.data;

      // Normalize device properties and handle missing fields
      const formattedDevices = devices.map((device) => {
         // Normalize all keys to lowercase to handle case-insensitive keys
         const normalizedDevice = {};
         Object.keys(device).forEach((key) => {
            normalizedDevice[key.toLowerCase()] = device[key];
         });

         // Extract and provide default values using destructuring
         const {
            imei = null,
            model = null,
            brand = null,
            color = null,
            ram = null,
            storage = null,
            grade = null,
            status = null,
            melding = null,
            catalog = null,
            cost = null,
            purchasedate = Date.now(),
         } = normalizedDevice;

         // Return a normalized and formatted device object
         return {
            imei,
            model,
            brand,
            color,
            ram,
            storage,
            grade,
            status,
            melding,
            catalog,
            cost,
            purchaseDate: new Date(purchasedate), // Ensure it's a valid date
         };
      });

      // // Filter out devices that have no IMEI (assuming IMEI is a must)
      // const uniqueDevices = formattedDevices.filter(device => device.imei);

      // if (uniqueDevices.length === 0) {
      //    return res.status(400).json({
      //       message: "No valid devices to create",
      //    });
      // }

      // Use bulkCreate with the filtered and formatted devices
      const createdDevices = await Device.bulkCreate(formattedDevices, {
         validate: true, // Validate before inserting
         ignoreDuplicates: true, // Prevent failing on duplicates
      });

      return res.status(201).json({
         message: "Devices created successfully",
         data: createdDevices,
      });
   } catch (error) {
      console.error("Error bulk creating devices:", error);
      return res.status(500).json({
         message: "Error bulk creating devices",
         error: error.message,
      });
   }
};

const getDeviceStatistics = async (req, res) => {
   try {
      // Total device count
      const totalDevices = await Device.count();

      // Grouped counts by various fields
      const modelsCount = await Device.findAll({
         attributes: [
            "model",
            [sequelize.fn("COUNT", sequelize.col("model")), "count"],
         ],
         group: ["model"],
      });

      const brandsCount = await Device.findAll({
         attributes: [
            "brand",
            [sequelize.fn("COUNT", sequelize.col("brand")), "count"],
         ],
         group: ["brand"],
      });

      const colorsCount = await Device.findAll({
         attributes: [
            "color",
            [sequelize.fn("COUNT", sequelize.col("color")), "count"],
         ],
         group: ["color"],
      });

      const gradesCount = await Device.findAll({
         attributes: [
            "grade",
            [sequelize.fn("COUNT", sequelize.col("grade")), "count"],
         ],
         group: ["grade"],
      });

      const statusesCount = await Device.findAll({
         attributes: [
            "status",
            [sequelize.fn("COUNT", sequelize.col("status")), "count"],
         ],
         group: ["status"],
      });

      const catalogsCount = await Device.findAll({
         attributes: [
            "catalog",
            [sequelize.fn("COUNT", sequelize.col("catalog")), "count"],
         ],
         group: ["catalog"],
      });

      // Total cost
      const totalCost = await Device.sum("cost");

      // Prepare response
      res.status(200).json({
         totalDevices,
         modelsCount,
         brandsCount,
         colorsCount,
         gradesCount,
         statusesCount,
         catalogsCount,
         totalCost,
      });
   } catch (error) {
      console.error("Error fetching device statistics:", error);
      res.status(500).json({
         message: "Error fetching device statistics",
         error,
      });
   }
};

const getDevicesWithLogs = async (req, res) => {
   try {
      console.log("Fetching devices with logs...");
      const devices = await Device.findAll({
         attributes: [
            "*",
            [
               sequelize.literal(
                  "(SELECT COUNT(*) FROM DeviceLogs WHERE DeviceLogs.deviceId = Device.id)"
               ),
               "hasLogs",
            ],
         ],
      });
      console.log("Devices fetched:", devices);
      const formattedDevices = devices.map((device) => ({
         ...device.toJSON(),
         hasLogs: device.hasLogs > 0,
      }));
      res.json(formattedDevices);
   } catch (err) {
      console.error("Error fetching devices with logs:", err); // More detailed logging
      res.status(500).json({ error: "Internal Server Error" });
   }
};

module.exports = {
   getDevices,
   getDevice,
   createDevice,
   updateDevice,
   deleteDevice,
   bulkCreateDevices,
   getDeviceStatistics,
   getDevicesWithLogs,
};

// const bulkCreateDevices = async (req, res) => {
//    const devices = req.body.data;

//    // Normalize and handle missing fields
//    const formattedDevices = devices.map((device) => ({
//       imei: device.imei || device.Imei || device.IMEI || null,
//       model: device.model || device.Model || device.MODEL || null,
//       brand: device.brand || device.Brand || device.BRAND || null,
//       color: device.color || device.Color || device.COLOR || null,
//       ram: device.ram || device.Ram || device.RAM || null,
//       storage: device.storage || device.Storage || device.STORAGE || null,
//       grade: device.grade || device.Grade || device.GRADE || null,
//       status: device.status || device.Status || device.STATUS || null,
//       melding: device.melding || device.Melding || device.MELDING || null,
//       catalog: device.catalog || device.Catalog || device.CATALOG || null,
//       cost: device.cost || device.Cost || device.COST || null,
//       purchaseDate:
//          device.purchaseDate ||
//          device.PurchaseDate ||
//          device.PURCHASEDATE ||
//          Date.now(),
//    }));

//    const uniqueDevicesMap = new Map();

//    formattedDevices.forEach((device) => {
//       const imeiKey = device.imei || device.IMEI || device.Imei; // Handle different key cases
//       if (imeiKey) {
//          uniqueDevicesMap.set(imeiKey, device);
//       }
//    });

//    // Convert the Map back to an array of unique devices
//    const uniqueDevices = Array.from(uniqueDevicesMap.values());

//    try {
//       // Perform bulkCreate with unique IMEIs only
//       const createdDevices = await Device.bulkCreate(uniqueDevices, {
//          validate: true,
//          ignoreDuplicates: true, // This prevents Sequelize from failing on duplicate entries
//       });

//       res.status(200).json({
//          message: "Devices created successfully",
//          data: createdDevices,
//       });
//    } catch (error) {
//       console.error("Error bulk creating devices:", error);
//       res.status(500).json({ message: "Error bulk creating devices", error });
//    }

//    // console.log("Creating devices:", formattedDevices);

//    // try {
//    //    const createdDevices = await Device.bulkCreate(
//    //       formattedDevices,
//    //       {
//    //          validate: true,
//    //       }
//    //    );

//    //    console.log("Devices created successfully:");

//    //    return res.status(201).json({
//    //       message: "Devices created successfully",
//    //       devices: createdDevices,
//    //    });
//    // } catch (error) {
//    //    console.error("Error bulk creating devices:", error);
//    //    return res
//    //       .status(500)
//    //       .json({ message: "Error bulk creating devices", error });
//    // }
// };
