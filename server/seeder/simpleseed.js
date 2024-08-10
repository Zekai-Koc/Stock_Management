const sequelize = require("../database/database");
const Brand = require("../models/brand");

async function seed() {
   try {
      await sequelize.sync({ force: true });

      console.log("Database synchronized.");

      const brands = ["Brand X", "Brand Y"];
      await Promise.all(brands.map((name) => Brand.create({ name })));
      console.log("Brands seeded.");
   } catch (error) {
      console.error("Error seeding database:", error);
   } finally {
      await sequelize.close();
      console.log("Database connection closed.");
   }
}

seed();
