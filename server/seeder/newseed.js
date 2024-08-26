const { Sequelize } = require("sequelize");
const sequelize = require("../database/database");
const DenormalizedDevice = require("../models/DenormalizedDevice");
const DeviceLog = require("../models/DeviceLog");

async function seed() {
   try {
      // Sync database and drop tables
      await sequelize.sync({ force: true });
      console.log("Database synchronized.");

      // Create dummy data for Devices
      const devices = [
         {
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

      // Create dummy data for DeviceLogs
      const deviceLogs = [
         {
            deviceId: "123456789012345",
            status: "Available",
            date: new Date("2023-01-10"),
            cost: 799.99,
         },
         {
            deviceId: "234567890123456",
            status: "Sold",
            date: new Date("2023-02-15"),
            cost: 999.99,
         },
         {
            deviceId: "345678901234567",
            status: "Available",
            date: new Date("2023-03-20"),
            cost: 599.99,
         },
         // Add more dummy logs as needed
      ];

      // Seed devices
      await DenormalizedDevice.bulkCreate(devices);
      console.log("Devices seeded.");

      // Seed device logs
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
