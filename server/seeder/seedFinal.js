const sequelize = require("../database/database"); // Ensure correct path
const Brand = require("../models/Brand");
const Model = require("../models/Model");
const Color = require("../models/Color");
const RAMOption = require("../models/RAMOption");
const StorageCapacity = require("../models/StorageCapacity");
const Grade = require("../models/Grade");
const Status = require("../models/Status");
const Catalog = require("../models/Catalog");
const Device = require("../models/Device");

const seed = async () => {
   try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");

      // Sync models
      await sequelize.sync({ force: true });

      // Insert data into each table
      await Brand.bulkCreate([
         { name: "Apple" },
         { name: "Samsung" },
         { name: "Google" },
         { name: "OnePlus" },
         { name: "Sony" },
      ]);

      const apple = await Brand.findOne({ where: { name: "Apple" } });
      const samsung = await Brand.findOne({ where: { name: "Samsung" } });
      const google = await Brand.findOne({ where: { name: "Google" } });
      const onePlus = await Brand.findOne({ where: { name: "OnePlus" } });
      const sony = await Brand.findOne({ where: { name: "Sony" } });

      await Model.bulkCreate([
         { name: "iPhone 12 Pro", brandId: apple.id },
         { name: "Galaxy S21", brandId: samsung.id },
         { name: "Pixel 6", brandId: google.id },
         { name: "OnePlus 9", brandId: onePlus.id },
         { name: "Xperia 5 III", brandId: sony.id },
      ]);

      const iphone12Pro = await Model.findOne({
         where: { name: "iPhone 12 Pro" },
      });
      const galaxyS21 = await Model.findOne({ where: { name: "Galaxy S21" } });
      const pixel6 = await Model.findOne({ where: { name: "Pixel 6" } });
      const onePlus9 = await Model.findOne({ where: { name: "OnePlus 9" } });
      const xperia5III = await Model.findOne({
         where: { name: "Xperia 5 III" },
      });

      await Color.bulkCreate([
         { name: "Black" },
         { name: "White" },
         { name: "Blue" },
         { name: "Red" },
      ]);

      const black = await Color.findOne({ where: { name: "Black" } });
      const white = await Color.findOne({ where: { name: "White" } });
      const blue = await Color.findOne({ where: { name: "Blue" } });
      const red = await Color.findOne({ where: { name: "Red" } });

      await RAMOption.bulkCreate([
         { size: "4" },
         { size: "6" },
         { size: "8" },
         { size: "10" },
         { size: "12" },
      ]);

      const ram4 = await RAMOption.findOne({ where: { size: "4" } });
      const ram6 = await RAMOption.findOne({ where: { size: "6" } });
      const ram8 = await RAMOption.findOne({ where: { size: "8" } });
      const ram10 = await RAMOption.findOne({ where: { size: "10" } });
      const ram12 = await RAMOption.findOne({ where: { size: "12" } });

      await StorageCapacity.bulkCreate([
         { capacity: "32" },
         { capacity: "64" },
         { capacity: "128" },
         { capacity: "256" },
         { capacity: "512" },
         { capacity: "1024" },
      ]);

      const storage64 = await StorageCapacity.findOne({
         where: { capacity: "64" },
      });
      const storage256 = await StorageCapacity.findOne({
         where: { capacity: "256" },
      });
      const storage128 = await StorageCapacity.findOne({
         where: { capacity: "128" },
      });
      const storage512 = await StorageCapacity.findOne({
         where: { capacity: "512" },
      });
      const storage1024 = await StorageCapacity.findOne({
         where: { capacity: "1024" },
      });

      await Grade.bulkCreate([
         { name: "A" },
         { name: "B" },
         { name: "C" },
         { name: "D" },
         { name: "Like New" },
         { name: "Excellent" },
      ]);

      const gradeB = await Grade.findOne({ where: { name: "B" } });
      const gradeA = await Grade.findOne({ where: { name: "A" } });
      const gradeC = await Grade.findOne({ where: { name: "C" } });
      const gradeD = await Grade.findOne({ where: { name: "D" } });

      await Status.bulkCreate([
         { name: "In Stock" },
         { name: "Sold" },
         { name: "Pending" },
      ]);

      const statusInStock = await Status.findOne({
         where: { name: "In Stock" },
      });
      const statusSold = await Status.findOne({ where: { name: "Sold" } });
      const statusPending = await Status.findOne({
         where: { name: "Pending" },
      });

      await Catalog.bulkCreate([
         { catalog_number: "s242" },
         { catalog_number: "dc246" },
         { catalog_number: "ds250" },
         { catalog_number: "dl212" },
      ]);

      const catalogS242 = await Catalog.findOne({
         where: { catalog_number: "s242" },
      });
      const catalogDC246 = await Catalog.findOne({
         where: { catalog_number: "dc246" },
      });
      const catalogDS250 = await Catalog.findOne({
         where: { catalog_number: "ds250" },
      });
      const catalogDL212 = await Catalog.findOne({
         where: { catalog_number: "dl212" },
      });

      // Insert data into Devices table

      await Device.bulkCreate([
         {
            imei: "123456789012350",
            brandId: sony.id,
            modelId: xperia5III.id,
            colorId: black.id,
            ramId: ram8.id,
            storageId: storage128.id,
            gradeId: gradeA.id,
            statusId: statusSold.id,
            melding: "No",
            catalogId: catalogDC246.id,
            purchaseDate: new Date("2023-02-14"),
         },
         {
            imei: "123456789012351",
            brandId: apple.id,
            modelId: iphone12Pro.id,
            colorId: white.id,
            ramId: ram12.id,
            storageId: storage512.id,
            gradeId: gradeB.id,
            statusId: statusInStock.id,
            melding: "No",
            catalogId: catalogS242.id,
            purchaseDate: new Date("2023-03-10"),
         },
         {
            imei: "123456789012352",
            brandId: samsung.id,
            modelId: galaxyS21.id,
            colorId: blue.id,
            ramId: ram8.id,
            storageId: storage256.id,
            gradeId: gradeA.id,
            statusId: statusSold.id,
            melding: "Yes",
            catalogId: catalogDC246.id,
            purchaseDate: new Date("2023-04-20"),
         },
         {
            imei: "123456789012353",
            brandId: google.id,
            modelId: pixel6.id,
            colorId: black.id,
            ramId: ram6.id,
            storageId: storage128.id,
            gradeId: gradeA.id,
            statusId: statusInStock.id,
            melding: "No",
            catalogId: catalogS242.id,
            purchaseDate: new Date("2023-05-15"),
         },
         {
            imei: "123456789012354",
            brandId: onePlus.id,
            modelId: onePlus9.id,
            colorId: white.id,
            ramId: ram12.id,
            storageId: storage512.id,
            gradeId: gradeB.id,
            statusId: statusSold.id,
            melding: "Yes",
            catalogId: catalogDC246.id,
            purchaseDate: new Date("2023-06-25"),
         },
         {
            imei: "123456789012355",
            brandId: sony.id,
            modelId: xperia5III.id,
            colorId: blue.id,
            ramId: ram10.id,
            storageId: storage256.id,
            gradeId: gradeA.id,
            statusId: statusInStock.id,
            melding: "No",
            catalogId: catalogS242.id,
            purchaseDate: new Date("2023-07-30"),
         },
         {
            imei: "123456789012356",
            brandId: apple.id,
            modelId: iphone12Pro.id,
            colorId: black.id,
            ramId: ram6.id,
            storageId: storage256.id,
            gradeId: gradeB.id,
            statusId: statusSold.id,
            melding: "Yes",
            catalogId: catalogDC246.id,
            purchaseDate: new Date("2023-08-12"),
         },
         {
            imei: "123456789012357",
            brandId: google.id,
            modelId: pixel6.id,
            colorId: white.id,
            ramId: ram4.id,
            storageId: storage64.id,
            gradeId: gradeC.id,
            statusId: statusPending.id,
            melding: "No",
            catalogId: catalogDS250.id,
            purchaseDate: new Date("2023-09-05"),
         },
         {
            imei: "123456789012358",
            brandId: onePlus.id,
            modelId: onePlus9.id,
            colorId: black.id,
            ramId: ram12.id,
            storageId: storage1024.id,
            gradeId: gradeA.id,
            statusId: statusInStock.id,
            melding: "Yes",
            catalogId: catalogDL212.id,
            purchaseDate: new Date("2023-10-01"),
         },
         {
            imei: "123456789012359",
            brandId: samsung.id,
            modelId: galaxyS21.id,
            colorId: red.id,
            ramId: ram8.id,
            storageId: storage128.id,
            gradeId: gradeD.id,
            statusId: statusSold.id,
            melding: "No",
            catalogId: catalogDC246.id,
            purchaseDate: new Date("2023-11-15"),
         },
         {
            imei: "123456789012360",
            brandId: sony.id,
            modelId: xperia5III.id,
            colorId: blue.id,
            ramId: ram6.id,
            storageId: storage256.id,
            gradeId: gradeB.id,
            statusId: statusInStock.id,
            melding: "Yes",
            catalogId: catalogDS250.id,
            purchaseDate: new Date("2023-12-20"),
         },
      ]);

      console.log("Database seeded successfully.");
   } catch (error) {
      console.error("Unable to seed the database:", error);
   } finally {
      await sequelize.close();
   }
};

seed();
