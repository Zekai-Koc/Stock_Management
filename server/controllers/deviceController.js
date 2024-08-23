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
const generateUniqueIMEI = require("../utils/generateUniqueIMEI");

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
      const missingFields = [];

      if (!imei) missingFields.push("IMEI");
      if (!brandId) missingFields.push("Brand");
      if (!modelId) missingFields.push("Model");
      if (!ramId) missingFields.push("RAM");
      if (!storageId) missingFields.push("Storage");
      if (!colorId) missingFields.push("Color");
      if (!gradeId) missingFields.push("Grade");
      if (!statusId) missingFields.push("Status");
      if (!catalogId) missingFields.push("Catalog");
      if (!purchaseDate) missingFields.push("Purchase Date");

      if (missingFields.length > 0) {
         const errorMessage = `Missing required fields: ${missingFields.join(
            ", "
         )}`;
         console.log(errorMessage);
         return res.status(400).json({ error: errorMessage });
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

      // Fetch the newly created device with associated data
      const deviceWithDetails = await Device.findOne({
         where: { imei: newDevice.imei },
         include: [
            { model: Brand },
            { model: Model },
            { model: Status },
            { model: RAM },
            { model: Storage },
            { model: Color },
            { model: Grade },
            { model: Catalog },
         ],
      });

      if (!deviceWithDetails) {
         return res.status(500).json({
            status: "error",
            message:
               "An unexpected error occurred while retrieving the device data.",
         });
      }

      // Construct the response object with full data
      const responseData = {
         imei: deviceWithDetails.imei,
         brand: deviceWithDetails.Brand.name,
         model: deviceWithDetails.Model.name,
         ram: deviceWithDetails.RAM.name,
         storage: deviceWithDetails.Storage.name,
         color: deviceWithDetails.Color.name,
         grade: deviceWithDetails.Grade.name,
         status: deviceWithDetails.Status.name,
         catalog: deviceWithDetails.Catalog.name,
         melding: deviceWithDetails.melding,
         purchaseDate: deviceWithDetails.purchaseDate,
      };

      res.status(201).json({
         status: "success",
         data: {
            device: responseData,
         },
      });
   } catch (error) {
      console.error("Error adding Device:", error);

      if (error.name === "SequelizeUniqueConstraintError") {
         const uniqueErrorMessage = error.errors
            .map((err) => err.message)
            .join(", ");
         return res.status(400).json({
            status: "fail",
            error: "Unique Constraint Error",
            message: uniqueErrorMessage,
         });
      }

      if (error.name === "SequelizeValidationError") {
         const validationMessages = error.errors.map((err) => err.message);
         return res.status(400).json({
            status: "fail",
            error: "Validation Error",
            details: validationMessages,
         });
      }

      return res.status(500).json({
         status: "error",
         message: "An unexpected error occurred while adding the device.",
         details: error.message,
      });
   }
};

// Update a Device by IMEI
const updateDevice = async (req, res) => {
   const { IMEI } = req.params;

   const { melding, purchaseDate } = req.body;
   const brandId = req.body.brand;
   const modelId = req.body.model;
   const ramId = req.body.ram;
   const storageId = req.body.storage;
   const colorId = req.body.color;
   const gradeId = req.body.grade;
   const statusId = req.body.status;
   const catalogId = req.body.catalog;

   console.log(
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
      // Find the device by IMEI
      const device = await Device.findOne({ where: { imei: IMEI } });
      if (device) {
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

// Update a Device by IMEI
const updateDeviceStatus = async (req, res) => {
   const { IMEI } = req.params;
   const statusId = req.body.status;

   console.log("updateDeviceStatus statusID", statusId);

   try {
      // Find the device and include associated models
      const device = await Device.findOne({
         where: { imei: IMEI },
         include: [
            { model: Brand },
            { model: Model },
            { model: Status },
            { model: RAM },
            { model: Storage },
            { model: Color },
            { model: Grade },
            { model: Catalog },
         ],
      });

      if (device) {
         // Update the status of the device
         await device.update({ statusId });

         // Construct the response object with full data
         const updatedDevice = {
            imei: device.imei,
            brand: device.Brand.name,
            model: device.Model.name,
            ram: device.RAM.name,
            storage: device.Storage.name,
            color: device.Color.name,
            grade: device.Grade.name,
            status: device.Status.name,
            catalog: device.Catalog.name,
            purchaseDate: device.purchaseDate,
            melding: device.melding,
         };

         res.status(200).json(updatedDevice);
      } else {
         console.error("Device not found");
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

const uploadFromExcel = async (req, res) => {
   const dataArray = req.body.data; // Ensure dataArray is correctly populated

   if (Array.isArray(dataArray) && dataArray.length > 1) {
      const headers = dataArray[0];
      const rows = dataArray.slice(1);

      // Create a mapping of headers to column names
      const headerMap = headers.reduce((acc, header, index) => {
         acc[header] = index;
         return acc;
      }, {});

      // Function to resolve names to IDs
      const resolveNamesToIDs = async (data) => {
         const brands = await Brand.findAll({ attributes: ["id", "name"] });
         const models = await Model.findAll({ attributes: ["id", "name"] });
         const rams = await RAM.findAll({ attributes: ["id", "name"] });
         const storages = await Storage.findAll({ attributes: ["id", "name"] });
         const colors = await Color.findAll({ attributes: ["id", "name"] });
         const grades = await Grade.findAll({ attributes: ["id", "name"] });
         const statuses = await Status.findAll({ attributes: ["id", "name"] });
         const catalogs = await Catalog.findAll({ attributes: ["id", "name"] });

         const brandMap = brands.reduce((acc, brand) => {
            acc[brand.name] = brand.id;
            return acc;
         }, {});
         const modelMap = models.reduce((acc, model) => {
            acc[model.name] = model.id;
            return acc;
         }, {});
         const ramMap = rams.reduce((acc, ram) => {
            acc[ram.name] = ram.id;
            return acc;
         }, {});
         const storageMap = storages.reduce((acc, storage) => {
            acc[storage.name] = storage.id;
            return acc;
         }, {});
         const colorMap = colors.reduce((acc, color) => {
            acc[color.name] = color.id;
            return acc;
         }, {});
         const gradeMap = grades.reduce((acc, grade) => {
            acc[grade.name] = grade.id;
            return acc;
         }, {});
         const statusMap = statuses.reduce((acc, status) => {
            acc[status.name] = status.id;
            return acc;
         }, {});
         const catalogMap = catalogs.reduce((acc, catalog) => {
            acc[catalog.name] = catalog.id;
            return acc;
         }, {});

         // Process the data and resolve names to IDs

         console.log("data:", data);

         const resolvedData = await Promise.all(
            data.map(async (item) => {
               return {
                  imei: item.imei ? item.imei : generateUniqueIMEI(),
                  brandId: brandMap[item.brand] || 1,
                  modelId: modelMap[item.model] || 1,
                  ramId: ramMap[item.ram] || 1,
                  storageId: storageMap[item.storage] || 3,
                  colorId: colorMap[item.color] || 3,
                  gradeId: gradeMap[item.grade] || 2,
                  statusId: statusMap[item.status] || 2,
                  catalogId: catalogMap[item.catalog] || 3,
                  melding: item.melding || false,
                  purchaseDate: item.purchaseDate || new Date(),
               };
            })
         );

         return resolvedData;
      };

      try {
         const devicesWithIDs = await resolveNamesToIDs(rows); // Use rows here

         // Insert data into the database
         await Device.bulkCreate(devicesWithIDs, {
            updateOnDuplicate: ["melding", "purchaseDate"], // Adjust fields to update if necessary
         });

         res.status(200).json({
            success: true,
            message: "Data imported successfully",
         });
      } catch (error) {
         console.error("Error importing data:", error);
         res.status(500).json({
            success: false,
            message: "Error importing data",
         });
      }
   } else {
      // Respond with an error if data is not valid
      res.status(400).json({
         success: false,
         message: "Invalid data",
      });
   }
};

// const uploadFromExcel = async (req, res) => {
//    const dataArray = req.body.data; // Ensure dataArray is correctly populated

//    if (Array.isArray(dataArray) && dataArray.length > 1) {
//       const headers = dataArray[0];
//       const rows = dataArray.slice(1);

//       // Create a mapping of headers to column names
//       const headerMap = headers.reduce((acc, header, index) => {
//          acc[header] = index;
//          return acc;
//       }, {});

//       // Function to resolve names to IDs
//       const resolveNamesToIDs = async (data) => {
//          const brands = await Brand.findAll({ attributes: ["id", "name"] });
//          const models = await Model.findAll({ attributes: ["id", "name"] });
//          const rams = await RAM.findAll({ attributes: ["id", "name"] });
//          const storages = await Storage.findAll({ attributes: ["id", "name"] });
//          const colors = await Color.findAll({ attributes: ["id", "name"] });
//          const grades = await Grade.findAll({ attributes: ["id", "name"] });
//          const statuses = await Status.findAll({ attributes: ["id", "name"] });
//          const catalogs = await Catalog.findAll({ attributes: ["id", "name"] });

//          const brandMap = brands.reduce((acc, brand) => {
//             acc[brand.name] = brand.id;
//             return acc;
//          }, {});
//          const modelMap = models.reduce((acc, model) => {
//             acc[model.name] = model.id;
//             return acc;
//          }, {});
//          const ramMap = rams.reduce((acc, ram) => {
//             acc[ram.name] = ram.id;
//             return acc;
//          }, {});
//          const storageMap = storages.reduce((acc, storage) => {
//             acc[storage.name] = storage.id;
//             return acc;
//          }, {});
//          const colorMap = colors.reduce((acc, color) => {
//             acc[color.name] = color.id;
//             return acc;
//          }, {});
//          const gradeMap = grades.reduce((acc, grade) => {
//             acc[grade.name] = grade.id;
//             return acc;
//          }, {});
//          const statusMap = statuses.reduce((acc, status) => {
//             acc[status.name] = status.id;
//             return acc;
//          }, {});
//          const catalogMap = catalogs.reduce((acc, catalog) => {
//             acc[catalog.name] = catalog.id;
//             return acc;
//          }, {});

//          console.log("Generated IMEI:", generateUniqueIMEI());
//          console.log("data:", data);

//          return data.map(async (item) => {
//             return {
//                imei: item.imei ? item.imei : generateUniqueIMEI(),
//                brandId: brandMap[item.brand] || 1,
//                ramId: ramMap[item.ram] || 1,
//                storageId: storageMap[item.storage] || 3,
//                colorId: colorMap[item.color] || 3,
//                gradeId: gradeMap[item.grade] || 2,
//                statusId: statusMap[item.status] || 2,
//                catalogId: catalogMap[item.catalog] || 3,
//                melding: item.melding || false,
//                purchaseDate: item.purchaseDate || new Date(),
//             };
//          });
//       };

//       try {
//          const devicesWithIDs = await resolveNamesToIDs(rows); // Use rows here

//          // Insert data into the database
//          await Device.bulkCreate(devicesWithIDs, {
//             updateOnDuplicate: ["melding", "purchaseDate"], // Adjust fields to update if necessary
//          });

//          res.status(200).json({
//             success: true,
//             message: "Data imported successfully",
//          });
//       } catch (error) {
//          console.error("Error importing data:", error);
//          res.status(500).json({
//             success: false,
//             message: "Error importing data",
//          });
//       }
//    } else {
//       // Respond with an error if data is not valid
//       res.status(400).json({
//          success: false,
//          message: "Invalid data",
//       });
//    }
// };

// const uploadFromExcel = async (req, res) => {
//    const dataArray = req.body.data;

//    if (Array.isArray(dataArray) && dataArray.length > 1) {
//       const headers = dataArray[0];
//       const rows = dataArray.slice(1);

//       // Create a mapping of headers to column names
//       const headerMap = headers.reduce((acc, header, index) => {
//          acc[header] = index;
//          return acc;
//       }, {});

//       // Function to resolve names to IDs
//       const resolveNamesToIDs = async (data) => {
//          const brands = await Brand.findAll({ attributes: ["id", "name"] });
//          const models = await Model.findAll({ attributes: ["id", "name"] });
//          const rams = await RAM.findAll({ attributes: ["id", "name"] });
//          const storages = await Storage.findAll({ attributes: ["id", "name"] });
//          const colors = await Color.findAll({ attributes: ["id", "name"] });
//          const grades = await Grade.findAll({ attributes: ["id", "name"] });
//          const statuses = await Status.findAll({ attributes: ["id", "name"] });
//          const catalogs = await Catalog.findAll({ attributes: ["id", "name"] });

//          const brandMap = brands.reduce((acc, brand) => {
//             acc[brand.name] = brand.id;
//             return acc;
//          }, {});
//          const modelMap = models.reduce((acc, model) => {
//             acc[model.name] = model.id;
//             return acc;
//          }, {});
//          const ramMap = rams.reduce((acc, ram) => {
//             acc[ram.name] = ram.id;
//             return acc;
//          }, {});
//          const storageMap = storages.reduce((acc, storage) => {
//             acc[storage.name] = storage.id;
//             return acc;
//          }, {});
//          const colorMap = colors.reduce((acc, color) => {
//             acc[color.name] = color.id;
//             return acc;
//          }, {});
//          const gradeMap = grades.reduce((acc, grade) => {
//             acc[grade.name] = grade.id;
//             return acc;
//          }, {});
//          const statusMap = statuses.reduce((acc, status) => {
//             acc[status.name] = status.id;
//             return acc;
//          }, {});
//          const catalogMap = catalogs.reduce((acc, catalog) => {
//             acc[catalog.name] = catalog.id;
//             return acc;
//          }, {});

//          return data.map(async (item) => {
//             return {
//                imei: item.imei ? item.imei : await generateUniqueIMEI(),
//                brandId: brandMap[item.brand] || defaultBrandId,
//                modelId: modelMap[item.model] || defaultModelId,
//                ramId: ramMap[item.ram] || defaultRamId,
//                storageId: storageMap[item.storage] || defaultStorageId,
//                colorId: colorMap[item.color] || defaultColorId,
//                gradeId: gradeMap[item.grade] || defaultGradeId,
//                statusId: statusMap[item.status] || defaultStatusId,
//                catalogId: catalogMap[item.catalog] || defaultCatalogId,
//                melding: item.melding || false,
//                purchaseDate: item.purchaseDate || new Date(),
//             };
//          });
//       };

//       try {
//          const devicesWithIDs = await resolveNamesToIDs(transformedData);

//          // Insert data into the database
//          await Device.bulkCreate(devicesWithIDs, {
//             updateOnDuplicate: ["melding", "purchaseDate"], // Adjust fields to update if necessary
//          });

//          res.status(200).json({
//             success: true,
//             message: "Data imported successfully",
//          });
//       } catch (error) {
//          console.error("Error importing data:", error);
//          res.status(500).json({
//             success: false,
//             message: "Error importing data",
//          });
//       }
//    } else {
//       // Respond with an error if data is not valid
//       res.status(400).json({
//          success: false,
//          message: "Invalid data",
//       });
//    }
// };

// const uploadFromExcel = async (req, res) => {
//    const dataArray = req.body.data;

//    if (Array.isArray(dataArray) && dataArray.length > 1) {
//       const headers = dataArray[0];
//       const rows = dataArray.slice(1);

//       // Create a mapping of headers to column names
//       const headerMap = headers.reduce((acc, header, index) => {
//          acc[header] = index;
//          return acc;
//       }, {});

//       // Extract the relevant columns
//       const transformedData = rows.map((row) => {
//          return {
//             imei: row[headerMap["imei"]],
//             brand: row[headerMap["brand"]],
//             model: row[headerMap["model"]],
//             ram: row[headerMap["ram"]],
//             storage: row[headerMap["storage"]],
//             color: row[headerMap["color"]],
//             grade: row[headerMap["grade"]],
//             status: row[headerMap["status"]],
//             catalog: row[headerMap["catalog"]],
//             melding: row[headerMap["melding"]] || false,
//             purchaseDate: row[headerMap["purchaseDate"]],
//          };
//       });

//       try {
//          // Function to resolve names to IDs
//          const resolveNamesToIDs = async (data) => {
//             const brands = await Brand.findAll({ attributes: ["id", "name"] });
//             const models = await Model.findAll({ attributes: ["id", "name"] });
//             const rams = await RAM.findAll({ attributes: ["id", "name"] });
//             const storages = await Storage.findAll({
//                attributes: ["id", "name"],
//             });
//             const colors = await Color.findAll({ attributes: ["id", "name"] });
//             const grades = await Grade.findAll({ attributes: ["id", "name"] });
//             const statuses = await Status.findAll({
//                attributes: ["id", "name"],
//             });
//             const catalogs = await Catalog.findAll({
//                attributes: ["id", "name"],
//             });

//             const brandMap = brands.reduce((acc, brand) => {
//                acc[brand.name] = brand.id;
//                return acc;
//             }, {});
//             const modelMap = models.reduce((acc, model) => {
//                acc[model.name] = model.id;
//                return acc;
//             }, {});
//             const ramMap = rams.reduce((acc, ram) => {
//                acc[ram.name] = ram.id;
//                return acc;
//             }, {});
//             const storageMap = storages.reduce((acc, storage) => {
//                acc[storage.name] = storage.id;
//                return acc;
//             }, {});
//             const colorMap = colors.reduce((acc, color) => {
//                acc[color.name] = color.id;
//                return acc;
//             }, {});
//             const gradeMap = grades.reduce((acc, grade) => {
//                acc[grade.name] = grade.id;
//                return acc;
//             }, {});
//             const statusMap = statuses.reduce((acc, status) => {
//                acc[status.name] = status.id;
//                return acc;
//             }, {});
//             const catalogMap = catalogs.reduce((acc, catalog) => {
//                acc[catalog.name] = catalog.id;
//                return acc;
//             }, {});

//             return data.map((item) => ({
//                imei: item.imei,
//                brandId: brandMap[item.brand],
//                modelId: modelMap[item.model],
//                ramId: ramMap[item.ram],
//                storageId: storageMap[item.storage],
//                colorId: colorMap[item.color],
//                gradeId: gradeMap[item.grade],
//                statusId: statusMap[item.status],
//                catalogId: catalogMap[item.catalog],
//                melding: item.melding,
//                purchaseDate: item.purchaseDate,
//             }));
//          };

//          const devicesWithIDs = await resolveNamesToIDs(transformedData);

//          // Insert data into the database
//          await Device.bulkCreate(devicesWithIDs, {
//             updateOnDuplicate: ["melding", "purchaseDate"], // Adjust fields to update if necessary
//          });

//          res.status(200).json({
//             success: true,
//             message: "Data imported successfully",
//          });
//       } catch (error) {
//          console.error("Error importing data:", error);
//          res.status(500).json({
//             success: false,
//             message: "Error importing data",
//          });
//       }
//    } else {
//       // Respond with an error if data is not valid
//       res.status(400).json({
//          success: false,
//          message: "Invalid data",
//       });
//    }
// };

// const uploadFromExcel = async (req, res) => {
//    const dataArray = req.body.data;

//    if (Array.isArray(dataArray) && dataArray.length > 1) {
//       const headers = dataArray[0];
//       console.log("Headers:", headers);

//       const result = dataArray.slice(1).map((row) => {
//          const obj = {};
//          headers.forEach((header, index) => {
//             obj[header] = row[index] || "";
//          });
//          return obj;
//       });

//       console.log("Transformed Data:", result);

//       res.status(200).json({
//          success: true,
//          message: "Data transformed successfully",
//          data: result,
//       });
//    } else {
//       // Respond with an error if data is not valid
//       res.status(400).json({
//          success: false,
//          message: "Invalid data",
//       });
//    }
// };

const checkID = async (req, res, next, val) => {
   console.log(`Device id is: ${val}`);
   next();
};

const checkBody = async (req, res, next) => {
   console.log("Checking body");
   next();
};

// Delete a Device by IMEI
const uploadDevicesFromExcel = async (req, res) => {
   console.log("uploadDevicesFromExcel", req.body);
};

module.exports = {
   getAllDevices,
   getDevice,
   createDevice,
   updateDevice,
   updateDeviceStatus,
   deleteDevice,
   checkID,
   checkBody,
   uploadDevicesFromExcel,
};
