const sequelize = require("../database/database"); // Ensure correct path
const Brand = require("../models/Brand");
const Model = require("../models/Model");
const Color = require("../models/Color");
const RAM = require("../models/RAM");
const Storage = require("../models/Storage");
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
       	{ name: "Huawei" },
	      { name: "Xiaomi" },
         { name: "Vivo" },
         { name: "Realme" },
         { name: "Lg" },
       	{ name: "Nokia" },
         { name: "Poco" },
         { name: "Honor" },
         { name: "Motorola" },
         { name: "Lenovo" },
         { name: "Zte" },
      ]);

      const apple = await Brand.findOne({ where: { name: "Apple" } });
      const samsung = await Brand.findOne({ where: { name: "Samsung" } });
      const google = await Brand.findOne({ where: { name: "Google" } });
      const onePlus = await Brand.findOne({ where: { name: "OnePlus" } });
      const sony = await Brand.findOne({ where: { name: "Sony" } });

      await Model.bulkCreate([
         { name: "iphone 6", brandId: apple.id },
         { name: "iphone 6 Plus", brandId: apple.id },
         { name: "iphone 7", brandId: apple.id },
         { name: "iphone 7 Plus", brandId: apple.id },
         { name: "iphone 8", brandId: apple.id },
         { name: "iphone 8 Plus", brandId: apple.id },
         { name: "iphone X", brandId: apple.id },
         { name: "iphone XS", brandId: apple.id },
         { name: "iphone XS Max", brandId: apple.id },
         { name: "iphone XR", brandId: apple.id },
         { name: "iphon SE 2020", brandId: apple.id },
         { name: "iphone SE 2022", brandId: apple.id },
         { name: "iphone 11", brandId: apple.id },
         { name: "iPhone 11 Pro", brandId: apple.id },
         { name: "iPhone 11 Pro Max", brandId: apple.id },
         { name: "iPhone 12 Mini", brandId: apple.id },
         { name: "iPhone 12 ", brandId: apple.id },
         { name: "iPhone 12 Pro", brandId: apple.id },
         { name: "iPhone 12 Pro Max", brandId: apple.id },
         { name: "iPhone 13 Míni", brandId: apple.id },
         { name: "iPhone 13", brandId: apple.id },
         { name: "iPhone 13 Pro", brandId: apple.id },
         { name: "iPhone 13 Pro Max", brandId: apple.id },
         { name: "iPhone 14", brandId: apple.id },
         { name: "iPhone 14 Plus", brandId: apple.id },
         { name: "iPhone 14 Pro", brandId: apple.id },
         { name: "iPhone 14 Pro Max", brandId: apple.id },
         
         { name: "Samsung Galaxy A01", brandId: samsung.id },
         { name: "Samsung Galaxy A02", brandId: samsung.id },
         { name: "Samsung Galaxy A03", brandId: samsung.id },
         { name: "Samsung Galaxy A04", brandId: samsung.id },
         { name: "Samsung Galaxy A05", brandId: samsung.id },
         { name: "Samsung Galaxy A10", brandId: samsung.id },
         { name: "Samsung Galaxy A11", brandId: samsung.id },
         { name: "Samsung Galaxy A12", brandId: samsung.id },
         { name: "Samsung Galaxy A13", brandId: samsung.id },
         { name: "Samsung Galaxy A14", brandId: samsung.id },
         { name: "Samsung Galaxy A15", brandId: samsung.id },
         { name: "Samsung Galaxy A20", brandId: samsung.id },
         { name: "Samsung Galaxy A21", brandId: samsung.id },
         { name: "Samsung Galaxy A22", brandId: samsung.id },
         { name: "Samsung Galaxy A23", brandId: samsung.id },
         { name: "Samsung Galaxy A24", brandId: samsung.id },
         { name: "Samsung Galaxy A25", brandId: samsung.id },
         { name: "Samsung Galaxy A3", brandId: samsung.id },
         { name: "Samsung Galaxy A30", brandId: samsung.id },
         { name: "Samsung Galaxy A31", brandId: samsung.id },
         { name: "Samsung Galaxy A32", brandId: samsung.id },
         { name: "Samsung Galaxy A33", brandId: samsung.id },
         { name: "Samsung Galaxy A34", brandId: samsung.id },
         { name: "Samsung Galaxy A35", brandId: samsung.id },
         { name: "Samsung Galaxy A40", brandId: samsung.id },
         { name: "Samsung Galaxy A41", brandId: samsung.id },
         { name: "Samsung Galaxy A42", brandId: samsung.id },
         { name: "Samsung Galaxy A43", brandId: samsung.id },
         { name: "Samsung Galaxy A5", brandId: samsung.id },
         { name: "Samsung Galaxy A50", brandId: samsung.id },
         { name: "Samsung Galaxy A51", brandId: samsung.id },
         { name: "Samsung Galaxy A52", brandId: samsung.id },
         { name: "Samsung Galaxy A53", brandId: samsung.id },
         { name: "Samsung Galaxy A54", brandId: samsung.id },
         { name: "Samsung Galaxy A55", brandId: samsung.id },
         { name: "Samsung Galaxy A6", brandId: samsung.id },
         { name: "Samsung Galaxy A60", brandId: samsung.id },
         { name: "Samsung Galaxy A7", brandId: samsung.id },
         { name: "Samsung Galaxy A70", brandId: samsung.id },
         { name: "Samsung Galaxy A71", brandId: samsung.id },
         { name: "Samsung Galaxy A72", brandId: samsung.id },
         { name: "Samsung Galaxy A73", brandId: samsung.id },
         { name: "Samsung Galaxy A8", brandId: samsung.id },
         { name: "Samsung Galaxy A80", brandId: samsung.id },
         { name: "Samsung Galaxy A82", brandId: samsung.id },
         { name: "Samsung Galaxy A9", brandId: samsung.id },
         { name: "Samsung Galaxy A90", brandId: samsung.id },
         { name: "Samsung Galaxy A9 Pro", brandId: samsung.id },
         
         { name: "Samsung Galaxy M013", brandId: samsung.id },
         { name: "Samsung Galaxy M015", brandId: samsung.id },
         { name: "Samsung Galaxy M017", brandId: samsung.id },
         { name: "Samsung Galaxy M022", brandId: samsung.id },
         { name: "Samsung Galaxy M025", brandId: samsung.id },
         { name: "Samsung Galaxy M0105", brandId: samsung.id },
         { name: "Samsung Galaxy M0115", brandId: samsung.id },
         { name: "Samsung Galaxy M0127", brandId: samsung.id },
         { name: "Samsung Galaxy M0205", brandId: samsung.id },
         { name: "Samsung Galaxy M0215", brandId: samsung.id },
         { name: "Samsung Galaxy M0305", brandId: samsung.id },
         { name: "Samsung Galaxy M0307", brandId: samsung.id },
         { name: "Samsung Galaxy M0315", brandId: samsung.id },
         { name: "Samsung Galaxy M0405", brandId: samsung.id },
         { name: "Samsung Galaxy M0426", brandId: samsung.id },
         { name: "Samsung Galaxy M0515", brandId: samsung.id },
         
         { name: "Samsung Galaxy S6", brandId: samsung.id },
         { name: "Samsung Galaxy S7", brandId: samsung.id },
         { name: "Samsung Galaxy S8", brandId: samsung.id },
         { name: "Samsung Galaxy S9", brandId: samsung.id },
         { name: "Samsung Galaxy S10", brandId: samsung.id },
         { name: "Samsung Galaxy S20", brandId: samsung.id },
         { name: "Samsung Galaxy S20+", brandId: samsung.id },
         { name: "Samsung Galaxy S20 Ultra", brandId: samsung.id },
         { name: "Samsung Galaxy S21", brandId: samsung.id },
         { name: "Samsung Galaxy S21+", brandId: samsung.id },
         { name: "Samsung Galaxy S21 Ultra", brandId: samsung.id },
         { name: "Samsung Galaxy S21 FE", brandId: samsung.id },
         { name: "Samsung Galaxy S22", brandId: samsung.id },
         { name: "Samsung Galaxy S22+", brandId: samsung.id },
         { name: "Samsung Galaxy S22 Ultra", brandId: samsung.id },
         { name: "Samsung Galaxy S23", brandId: samsung.id },
         { name: "Samsung Galaxy S23+", brandId: samsung.id },
         { name: "Samsung Galaxy S23 Ultra", brandId: samsung.id },
         { name: "Samsung Galaxy S23 FE", brandId: samsung.id },
         { name: "Samsung Galaxy S24", brandId: samsung.id },
         { name: "Samsung Galaxy S24+", brandId: samsung.id },
         { name: "Samsung Galaxy S24 Ultra", brandId: samsung.id },
         
         { name: "Samsung Galaxy Z Flip", brandId: samsung.id },
         { name: "Samsung Galaxy Z Fold", brandId: samsung.id },
         { name: "Samsung Galaxy Z Fold 2", brandId: samsung.id },
         { name: "Samsung Galaxy Z Flip 3", brandId: samsung.id },
         { name: "Samsung Galaxy Z Fold 3 ", brandId: samsung.id },
         { name: "Samsung Galaxy Z Flip 4", brandId: samsung.id },
         { name: "Samsung Galaxy Z Fold 4", brandId: samsung.id },
         
         { name: "Samsung Galaxy Xcover 4", brandId: samsung.id },
         
         { name: "Samsung Galaxy Note", brandId: samsung.id },
         { name: "Samsung Galaxy Note 2", brandId: samsung.id },
         { name: "Samsung Galaxy Note 3", brandId: samsung.id },
         { name: "Samsung Galaxy Note 3 Neo", brandId: samsung.id },
         { name: "Samsung Galaxy Note 4", brandId: samsung.id },
         { name: "Samsung Galaxy Note Edge", brandId: samsung.id },
         { name: "Samsung Galaxy Note 5", brandId: samsung.id },
         { name: "Samsung Galaxy Note 7", brandId: samsung.id },
         { name: "Samsung Galaxy Note 8", brandId: samsung.id },
         { name: "Samsung Galaxy Note 9", brandId: samsung.id },
         { name: "Samsung Galaxy Note 10", brandId: samsung.id },
         { name: "Samsung Galaxy Note 20", brandId: samsung.id },
         
         { name: "Pixel 6", brandId: google.id },
         { name: "OnePlus 9", brandId: onePlus.id },
         { name: "Xperia 5 III", brandId: sony.id },
         
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
         { name: "Blue" },
         { name: "Gold" },
         { name: "Gray" },
         { name: "Green" },
         { name: "Orange" },
         { name: "Pink" },
         { name: "Purple" },
         { name: "Red" },
         { name: "Silver" },
         { name: "White" },
         { name: "Yellow" }
      ]);

      const black = await Color.findOne({ where: { name: "Black" } });
      const white = await Color.findOne({ where: { name: "White" } });
      const blue = await Color.findOne({ where: { name: "Blue" } });
      const red = await Color.findOne({ where: { name: "Red" } });

      await RAM.bulkCreate([
         { size: "2" },
         { size: "4" },
         { size: "6" },
         { size: "8" },
         { size: "10" },
         { size: "12" },
         { size: "14" },
         { size: "16" },
         { size: "18" },
         { size: "20" },
      ]);

      const ram4 = await RAM.findOne({ where: { size: "4" } });
      const ram6 = await RAM.findOne({ where: { size: "6" } });
      const ram8 = await RAM.findOne({ where: { size: "8" } });
      const ram10 = await RAM.findOne({ where: { size: "10" } });
      const ram12 = await RAM.findOne({ where: { size: "12" } });

      await Storage.bulkCreate([
         { capacity: "32" },
         { capacity: "64" },
         { capacity: "128" },
         { capacity: "256" },
         { capacity: "512" },
         { capacity: "1024" },
         { capacity: "2048" },
      ]);

      const storage64 = await Storage.findOne({
         where: { capacity: "64" },
      });
      const storage256 = await Storage.findOne({
         where: { capacity: "256" },
      });
      const storage128 = await Storage.findOne({
         where: { capacity: "128" },
      });
      const storage512 = await Storage.findOne({
         where: { capacity: "512" },
      });
      const storage1024 = await Storage.findOne({
         where: { capacity: "1024" },
      });

      await Grade.bulkCreate([
         { name: "A" },
         { name: "B" },
         { name: "C" },
         { name: "D" },
         { name: "Like New" },
         { name: "Excellent" },
         { name: "Very Good" },
         { name: "Good" },
         { name: "Fair" },
         { name: "Poor" }
      ]);

      const gradeB = await Grade.findOne({ where: { name: "B" } });
      const gradeA = await Grade.findOne({ where: { name: "A" } });
      const gradeC = await Grade.findOne({ where: { name: "C" } });
      const gradeD = await Grade.findOne({ where: { name: "D" } });

      await Status.bulkCreate([
         { name: "In Stock" },
         { name: "Sold" },
         { name: "Returned" },
         { name: "Repair" },
         { name: "Warranty" },
         { name: "KAPUT" },
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
         { catalog_number: "dc247" },
         { catalog_number: "dcx1" },
         { catalog_number: "nc241" },
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
