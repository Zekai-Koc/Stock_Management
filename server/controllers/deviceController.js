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
   Catalog,
} = require("../models");

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
               attributes: ["name"], // Only include the RAM's size
            },
            {
               model: Storage,
               attributes: ["name"], // Only include the storage's capacity
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
            {
               model: Catalog,
               attributes: ["name"],
            },
         ],
      });

      // Map the results to replace IDs with names
      const mappedDevices = devices.map((device) => ({
         imei: device.imei,
         brand: device.Brand.name,
         model: device.Model.name,
         ram: device.RAM.name,
         storage: device.Storage.name,
         color: device.Color.name,
         grade: device.Grade.name,
         status: device.Status.name,
         melding: device.melding,
         catalog: device.Catalog.name,
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
const createDevice = async (req, res) => {
   console.log("createDevice");
   console.log("createDevice", req.body);

   const { imei, melding, purchaseDate } = req.body;
   const brandId = req.body.brand;
   const modelId = req.body.model;
   const ramId = req.body.ram;
   const storageId = req.body.storage;
   const colorId = req.body.color;
   const gradeId = req.body.grade;
   const statusId = req.body.status;
   const catalogId = req.body.catalog;

   console.log(
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
      purchaseDate
   );

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
         // !melding ||
         !catalogId ||
         !purchaseDate
      ) {
         console.log("Missing required fields");
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

module.exports = {
   getAllDevices,
   getDevice,
   createDevice,
   updateDevice,
   deleteDevice,
   checkID,
   checkBody,
};
