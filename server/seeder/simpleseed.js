const sequelize = require("../database/database");
const DenormalizedDevice = require("../models/DenormalizedDevice");

async function seed() {
   try {
      // Synchronize the database and clear existing data (force: true)
      await sequelize.sync({ force: true });

      console.log("Database synchronized.");

      // Create dummy data
      const devices = [
         {
            imei: "123456789012345",
            model: "iPhone 12",
            brand: "Apple",
            ram: 4,
            storage: 128,
            color: "Black",
            grade: "A",
            melding: false,
            status: "New",
            catalog: "Electronics",
            purchaseDate: new Date(),
            cost: 799.99,
            notes: "Brand new, sealed.",
            active: true,
         },
         {
            imei: "987654321098765",
            model: "Samsung Galaxy S21",
            brand: "Samsung",
            ram: 8,
            storage: 256,
            color: "White",
            grade: "B",
            melding: false,
            status: "Used",
            catalog: "Electronics",
            purchaseDate: new Date(),
            cost: 699.99,
            notes: "Slightly used, no scratches.",
            active: true,
         },
         {
            imei: "111122223333444",
            model: "Google Pixel 6",
            brand: "Google",
            ram: 6,
            storage: 128,
            color: "Blue",
            grade: "A",
            melding: true,
            status: "Refurbished",
            catalog: "Mobile",
            purchaseDate: new Date(),
            cost: 599.99,
            notes: "Refurbished, good condition.",
            active: true,
         },
      ];

      // Insert dummy data
      await DenormalizedDevice.bulkCreate(devices);

      console.log("Dummy data seeded successfully.");
   } catch (error) {
      console.error("Error seeding database:", error);
   } finally {
      await sequelize.close();
      console.log("Database connection closed.");
   }
}

seed();
