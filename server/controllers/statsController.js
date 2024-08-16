const { Sequelize } = require("sequelize");
const Device = require("../models/Device");
const Brand = require("../models/Brand");
const Model = require("../models/Model");
const Grade = require("../models/Grade");
const Status = require("../models/Status");
const RAM = require("../models/RAM");
const Storage = require("../models/Storage");
const Color = require("../models/Color");

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
            [Sequelize.col("RAM.name"), "ramSize"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: RAM, attributes: [] }],
         group: ["RAM.id", "RAM.name"],
      });

      // Count devices grouped by storage capacity
      const devicesByStorage = await Device.findAll({
         attributes: [
            // [Sequelize.col("Storage.id"), "storageId"],
            [Sequelize.col("Storage.name"), "storage"],
            [Sequelize.fn("COUNT", Sequelize.col("Device.imei")), "count"],
         ],
         include: [{ model: Storage, attributes: [] }],
         group: ["Storage.id", "Storage.name"],
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

const getModelsByBrand = async () => {
   const brandId = 1; // Example brandId
   try {
      const devicesWithModels = await Device.findAll({
         attributes: [
            [Sequelize.col("Model.name"), "modelName"], // Select model name
         ],
         include: [
            {
               model: Model,
               attributes: [], // Exclude attributes of Model if not needed
               where: {
                  brandId: brandId, // Filter for the specific brandId
               },
            },
         ],
         group: ["Model.name"], // Group by model name to ensure uniqueness
         order: [["Model.name", "ASC"]], // Optional: Order results
      });

      // Extract model names
      const models = devicesWithModels.map((device) => device.get("modelName"));
      return models;
   } catch (error) {
      console.error("Error fetching models by brand:", error);
      throw error;
   }
};

const getDevicesByGrade = async (req, res) => {
   try {
      const devicesByGrade = await Grade.findAll({
         include: [
            {
               model: Device,
               as: "Devices", // Use the association name if you specified an alias
            },
         ],
      });

      // Send the result as JSON response
      res.status(200).json(devicesByGrade);
   } catch (error) {
      console.error("Error fetching devices by grade:", error);
      res.status(500).json({
         message: "An error occurred while fetching devices by grade.",
      });
   }
};

const getGroupedDevicesByGrade = async (req, res) => {
   try {
      const devices = await Device.findAll({
         include: [
            {
               model: Grade,
               attributes: ["name"], // Only include the name of the grade
            },
         ],
      });

      // Group devices by grade name
      const groupedDevices = devices.reduce((acc, device) => {
         const gradeName = device.Grade.name;
         if (!acc[gradeName]) {
            acc[gradeName] = [];
         }
         acc[gradeName].push(device);
         return acc;
      }, {});

      // Send the grouped result as JSON response
      res.status(200).json(groupedDevices);
   } catch (error) {
      console.error("Error fetching and grouping devices by grade:", error);
      res.status(500).json({
         message: "An error occurred while grouping devices by grade.",
      });
   }
};

const getGroupedDevicesByGradeWithCounts = async (req, res) => {
   try {
      // Fetch all devices with their associated grades
      const devices = await Device.findAll({
         include: [
            {
               model: Grade,
               attributes: ["name"], // Include only the grade name
            },
         ],
      });

      // Initialize an object to store the counts by grade name
      const gradeCounts = {};

      // Group devices by grade name and count them
      devices.forEach((device) => {
         const gradeName = device.Grade.name;

         // Initialize the grade entry if it doesn't exist
         if (!gradeCounts[gradeName]) {
            gradeCounts[gradeName] = 0;
         }

         // Increment the count for this grade
         gradeCounts[gradeName] += 1;
      });

      // Convert the gradeCounts object into an array of objects with grade name and count
      const result = Object.keys(gradeCounts).map((gradeName) => ({
         gradeName,
         count: gradeCounts[gradeName],
      }));

      // Send the result as JSON response

      console.log(result);

      res.status(200).json(result);
   } catch (error) {
      console.error("Error fetching and grouping devices by grade:", error);
      res.status(500).json({
         message: "An error occurred while grouping devices by grade.",
      });
   }
};

// const getGroupedDevicesByGradeWithCounts = async (req, res) => {
//    try {
//       const devices = await Device.findAll({
//          include: [
//             {
//                model: Grade,
//                attributes: ["name"], // Only include the name of the grade
//             },
//          ],
//       });

//       // Initialize an object to store the counts and devices grouped by grade name
//       const groupedDevices = {};

//       // Group devices by grade name and count them
//       devices.forEach((device) => {
//          const gradeName = device.Grade.name;

//          // Initialize the grade entry if it doesn't exist
//          if (!groupedDevices[gradeName]) {
//             groupedDevices[gradeName] = {
//                count: 0,
//                devices: [],
//             };
//          }

//          // Increment the count and add the device to the list
//          groupedDevices[gradeName].count += 1;
//          groupedDevices[gradeName].devices.push(device);
//       });

//       // Send the grouped result with counts as JSON response
//       res.status(200).json(groupedDevices);
//    } catch (error) {
//       console.error("Error fetching and grouping devices by grade:", error);
//       res.status(500).json({
//          message: "An error occurred while grouping devices by grade.",
//       });
//    }
// };

module.exports = {
   getDeviceStats,
   getModelsByBrand,
   getDevicesByGrade,
   getGroupedDevicesByGrade,
   getGroupedDevicesByGradeWithCounts,
};
