// const { Sequelize } = require("sequelize");
// const sequelize = require("../database/database");
// const Device = require("../models/Device");
// const DeviceLog = require("../models/DeviceLog");


const { sequelize, Device, DeviceLog } = require('../models');

async function seed() {
   try {
      // Drop all tables and recreate them
      // await sequelize.sync({ force: true });
      // console.log("Database synchronized and all tables recreated.");

      await Device.sync({ alter: true });
      await DeviceLog.sync({ alter: true });



      // Dummy data for Devices
      const devices = [
         {
            id: "4",
            imei: "123456789012345",
            model: "Galaxy S21",
            ram: "8",
            storage: "128",
            color: "Phantom Gray",
            grade: "New",
            status: "Available",
            melding: false,
            catalog: "Catalog A",
            purchaseDate: new Date("2023-01-10"),
            cost: 799.99,
         },
         {
            id: "5",
            imei: "234567890123456",
            model: "iPhone 13",
            ram: "6",
            storage: "256",
            color: "Midnight Blue",
            grade: "Used",
            status: "Sold",
            melding: true,
            catalog: "Catalog B",
            purchaseDate: new Date("2023-02-15"),
            cost: 999.99,
         },
         {
            id: "6",
            imei: "345678901234567",
            model: "Pixel 6",
            ram: "12",
            storage: "128",
            color: "Stormy Black",
            grade: "Refurbished",
            status: "Available",
            melding: false,
            catalog: "Catalog C",
            purchaseDate: new Date("2023-03-20"),
            cost: 599.99,
         },
         // Add more dummy devices as needed
      ];

      await Device.bulkCreate(devices);
      console.log("Devices seeded.");

      // Dummy data for DeviceLogs
      const deviceLogs = [
         {
            deviceId: "1",
            status: "Available",
            date: new Date("2023-01-10"),
            cost: 799.99,
         },
         {
            deviceId: "2",
            status: "Sold",
            date: new Date("2023-02-15"),
            cost: 999.99,
         },
         {
            deviceId: "3",
            status: "Available",
            date: new Date("2023-03-20"),
            cost: 599.99,
         },
         // Add more dummy logs as needed
      ];

      await DeviceLog.bulkCreate(deviceLogs);
      console.log("DeviceLogs seeded.");
   } catch (error) {
      console.error("Error seeding database:", error);
   } finally {
      await sequelize.close();
      console.log("Database connection closed.");
   }
}

seed();



// const { Sequelize } = require("sequelize");
// const sequelize = require("../database/database");
// const Device = require("../models/Device");
// const DeviceLog = require("../models/DeviceLog");

// async function seed() {
//    try {
//       // Sync database and drop tables
//       // await sequelize.sync({ force: true });
//       // console.log("Database synchronized.");


//       await Device.sync({ alter: true }); 
//       await DeviceLog.sync({ alter: true }); 


//       // Create dummy data for Devices
//       const devices = [
//          {
            
//             id: "1",
//             imei: "123456789012345",
//             model: "Galaxy S21",
//             ram: "8",
//             storage: "128",
//             color: "Phantom Gray",
//             grade: "New",
//             status: "Available",
//             melding: false,
//             catalog: "Catalog A",
//             purchaseDate: new Date("2023-01-10"),
//             cost: 799.99,
//          },
//          {
//             id: "2",
//             imei: "234567890123456",
//             model: "iPhone 13",
//             ram: "6",
//             storage: "256",
//             color: "Midnight Blue",
//             grade: "Used",
//             status: "Sold",
//             melding: true,
//             catalog: "Catalog B",
//             purchaseDate: new Date("2023-02-15"),
//             cost: 999.99,
//          },
//          {
//             id: "3",
//             imei: "345678901234567",
//             model: "Pixel 6",
//             ram: "12",
//             storage: "128",
//             color: "Stormy Black",
//             grade: "Refurbished",
//             status: "Available",
//             melding: false,
//             catalog: "Catalog C",
//             purchaseDate: new Date("2023-03-20"),
//             cost: 599.99,
//          },
//          // Add more dummy devices as needed
//       ];

//       // Create dummy data for DeviceLogs
//       const deviceLogs = [
//          {
//             deviceId: "1",
//             status: "Available",
//             date: new Date("2023-01-10"),
//             cost: 799.99,
//          },
//          {
//             deviceId: "2",
//             status: "Sold",
//             date: new Date("2023-02-15"),
//             cost: 999.99,
//          },
//          {
//             deviceId: "3",
//             status: "Available",
//             date: new Date("2023-03-20"),
//             cost: 599.99,
//          },
//          // Add more dummy logs as needed
//       ];

//       // Seed devices
//       await Device.bulkCreate(devices);
//       console.log("Devices seeded.");

//       // Seed device logs
//       await DeviceLog.bulkCreate(deviceLogs);
//       console.log("DeviceLogs seeded.");
//    } catch (error) {
//       console.error("Error seeding database:", error);
//    } finally {
//       await sequelize.close();
//       console.log("Database connection closed.");
//    }
// }

// seed();
