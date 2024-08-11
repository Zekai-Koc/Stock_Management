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
// const getAllDevices = async (req, res) => {
//    console.log("getAllDevices");
//    try {
//       const devices = await Device.findAll();
//       res.json({
//          count: devices.length,
//          devices,
//       });
//    } catch (error) {
//       console.error("Error fetching Devices:", error);
//       res.status(500).send("Error fetching Devices");
//    }
// };
// const getAllDevices = async (req, res) => {
//    console.log("getAllDevices");
//    try {
//       const devices = await Device.findAll({
//          include: [
//             {
//                model: Brand,
//                attributes: ["name"], // Only include the brand's name
//             },
//             {
//                model: Model,
//                attributes: ["name"], // Only include the model's name
//             },
//             {
//                model: RAM,
//                attributes: ["size"], // Only include the RAM's name
//             },
//             {
//                model: Storage,
//                attributes: ["capacity"], // Only include the storage's name
//             },
//             {
//                model: Color,
//                attributes: ["name"], // Only include the color's name
//             },
//             {
//                model: Grade,
//                attributes: ["name"], // Only include the grade's name
//             },
//             {
//                model: Status,
//                attributes: ["name"], // Only include the status's name
//             },
//          ],
//       });

//       // Map the results to replace IDs with names
//       const result = devices.map((device) => ({
//          imei: device.imei,
//          brand: device.Brand.name,
//          model: device.Model.name,
//          ram: device.RAM.size,
//          storage: device.Storage.capacity,
//          color: device.Color.name,
//          grade: device.Grade.name,
//          status: device.Status.name,
//          melding: device.melding,
//          catalog: device.catalog_number,
//          purchaseDate: device.purchaseDate,
//       }));

//       res.json({
//          count: result.length,
//          devices: result,
//       });
//    } catch (error) {
//       console.error("Error fetching Devices:", error);
//       res.status(500).send("Error fetching Devices");
//    }
// };

// Read all devices and group by brand
const getAllDevices = async (req, res) => {
   console.log("getAllDevices");
   try {
      const devices = await Device.findAll({
         include: [
            {
               model: Brand,
               attributes: ["name"], // Only include the brand's name
            },
            {
               model: Model,
               attributes: ["name"], // Only include the model's name
            },
            {
               model: RAM,
               attributes: ["size"], // Only include the RAM's size
            },
            {
               model: Storage,
               attributes: ["capacity"], // Only include the storage's capacity
            },
            {
               model: Color,
               attributes: ["name"], // Only include the color's name
            },
            {
               model: Grade,
               attributes: ["name"], // Only include the grade's name
            },
            {
               model: Status,
               attributes: ["name"], // Only include the status's name
            },
         ],
      });

      // Map the results to replace IDs with names
      const mappedDevices = devices.map((device) => ({
         imei: device.imei,
         brand: device.Brand.name,
         model: device.Model.name,
         ram: device.RAM.size,
         storage: device.Storage.capacity,
         color: device.Color.name,
         grade: device.Grade.name,
         status: device.Status.name,
         melding: device.melding,
         catalog: device.catalog_number,
         purchaseDate: device.purchaseDate,
      }));

      // Group devices by brand
      const groupedByBrand = mappedDevices.reduce((acc, device) => {
         if (!acc[device.brand]) {
            acc[device.brand] = [];
         }
         acc[device.brand].push(device);
         return acc;
      }, {});

      res.json({
         count: mappedDevices.length,
         devicesByBrand: groupedByBrand,
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
// const createDevice = async (req, res) => {
//    console.log("createDevice");
//    console.log("createDevice", req.body);

//    const {
//       imei,
//       brandId,
//       modelId,
//       ramId,
//       storageId,
//       colorId,
//       gradeId,
//       statusId,
//       melding,
//       catalogId,
//       purchaseDate,
//    } = req.body;

//    try {
//       // Validate request body
//       if (
//          !imei ||
//          !brandId ||
//          !modelId ||
//          !ramId ||
//          !storageId ||
//          !colorId ||
//          !gradeId ||
//          !statusId ||
//          !melding ||
//          !catalogId ||
//          !purchaseDate
//       ) {
//          return res.status(400).send("Missing required fields");
//       }

//       // Create the new device
//       const newDevice = await Device.create({
//          imei,
//          brandId,
//          modelId,
//          ramId,
//          storageId,
//          colorId,
//          gradeId,
//          statusId,
//          melding,
//          catalogId,
//          purchaseDate,
//       });

//       res.status(201).json({
//          status: "success",
//          data: {
//             device: newDevice,
//          },
//       });
//    } catch (error) {
//       console.error("Error adding Device:", error);
//       res.status(500).send("Error adding Device");
//    }
// };

const createDevice = async (req, res) => {
   try {
      const {
         brand,
         model,
         ram,
         storage,
         color,
         grade,
         imei,
         purchaseDate,
         status,
         melding,
      } = req.body;

      // Find corresponding IDs for each attribute
      const brandRecord = await Brand.findOne({ where: { name: brand } });
      const modelRecord = await Model.findOne({ where: { name: model } });
      const ramRecord = await RAM.findOne({ where: { size: ram } });
      const storageRecord = await Storage.findOne({
         where: { capacity: storage },
      });
      const colorRecord = await Color.findOne({ where: { name: color } });
      const gradeRecord = await Grade.findOne({ where: { name: grade } });
      const statusRecord = await Status.findOne({ where: { name: status } });

      // Validate all required records are found
      if (
         !brandRecord ||
         !modelRecord ||
         !ramRecord ||
         !storageRecord ||
         !colorRecord ||
         !gradeRecord ||
         !statusRecord
      ) {
         return res
            .status(400)
            .json({ error: "Invalid attribute value provided" });
      }

      // Create new device record
      const newDevice = await Device.create({
         imei,
         brandId: brandRecord.id,
         modelId: modelRecord.id,
         ramId: ramRecord.id,
         storageId: storageRecord.id,
         colorId: colorRecord.id,
         gradeId: gradeRecord.id,
         statusId: statusRecord.id,
         melding: melding === "Yes", // Convert to boolean
         purchaseDate: new Date(purchaseDate),
         catalogId: 1, // Example default catalog ID, adjust as needed
      });

      res.status(201).json(newDevice);
   } catch (error) {
      console.error("Error creating device:", error);
      res.status(500).json({ error: "Internal Server Error" });
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
