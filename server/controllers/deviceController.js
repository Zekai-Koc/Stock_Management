const Device = require("../models/device");

// Read all mobiles
const getAllDevices = async (req, res) => {
   console.log("getAllDevices");
   try {
      const devices = await Device.findAll();
      res.json(devices);
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

module.exports = {
   getAllDevices,
   getDevice,
   createDevice,
   updateDevice,
   deleteDevice,
   checkID,
   checkBody,
};
