const DenormalizedDevice = require("../models/DenormalizedDevice");
const DeviceLog = require("../models/DeviceLog");

// Get all devices
const getDevices = async (req, res) => {
   try {
      const devices = await DenormalizedDevice.findAll();
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
      const device = await DenormalizedDevice.findOne({ where: { imei } });
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
      const newDevice = await DenormalizedDevice.create({
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
      const device = await DenormalizedDevice.findOne({ where: { imei } });

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
      const device = await DenormalizedDevice.findOne({ where: { imei } });

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
   const devices = req.body.data;

   // Normalize and handle missing fields
   const formattedDevices = devices.map((device) => ({
      imei: device.imei || device.IMEI || device.Imei || null,
      model: device.model || device.Model || device.MODEL || null,
      brand: device.brand || device.Brand || device.BRAND || null,
      color: device.color || null,
      ram: device.ram || null,
      storage: device.storage || null,
      grade: device.grade || null,
      status: device.status || null,
      melding: device.melding || null,
      catalog: device.catalog || null,
      cost: device.cost || null,
      purchaseDate: device.purchaseDate || Date.now(),
   }));

   const uniqueDevicesMap = new Map();

   formattedDevices.forEach((device) => {
      const imeiKey = device.imei || device.IMEI || device.Imei; // Handle different key cases
      if (imeiKey) {
         uniqueDevicesMap.set(imeiKey, device);
      }
   });

   // Convert the Map back to an array of unique devices
   const uniqueDevices = Array.from(uniqueDevicesMap.values());

   try {
      // Perform bulkCreate with unique IMEIs only
      const createdDevices = await DenormalizedDevice.bulkCreate(
         uniqueDevices,
         {
            validate: true,
            ignoreDuplicates: true, // This prevents Sequelize from failing on duplicate entries
         }
      );

      res.status(200).json({
         message: "Devices created successfully",
         data: createdDevices,
      });
   } catch (error) {
      console.error("Error bulk creating devices:", error);
      res.status(500).json({ message: "Error bulk creating devices", error });
   }

   // console.log("Creating devices:", formattedDevices);

   // try {
   //    const createdDevices = await DenormalizedDevice.bulkCreate(
   //       formattedDevices,
   //       {
   //          validate: true,
   //       }
   //    );

   //    console.log("Devices created successfully:");

   //    return res.status(201).json({
   //       message: "Devices created successfully",
   //       devices: createdDevices,
   //    });
   // } catch (error) {
   //    console.error("Error bulk creating devices:", error);
   //    return res
   //       .status(500)
   //       .json({ message: "Error bulk creating devices", error });
   // }
};

module.exports = {
   getDevices,
   getDevice,
   createDevice,
   updateDevice,
   deleteDevice,
   bulkCreateDevices,
};
