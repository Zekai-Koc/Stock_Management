const sequelize = require("../database/database");
const Ram = require("../models/Ram");
const StorageCapacity = require("../models/Storage");
const Status = require("../models/Status");
const Model = require("../models/Model");
const Color = require("../models/Color");
const Grade = require("../models/Grade");
const Device = require("../models/Device");
const Brand = require("../models/Brand"); // Import the Brand model

async function seed() {
   try {
      await sequelize.sync({ force: true });

      console.log("Database synchronized.");

      const ramOptions = ["2GB", "4GB", "6GB", "8GB", "10GB"];
      await Promise.all(ramOptions.map((value) => Ram.create({ value })));
      console.log("RAM options seeded.");

      const storageOptions = [
         "32GB",
         "64GB",
         "128GB",
         "256GB",
         "512GB",
         "1024GB",
      ];
      await Promise.all(
         storageOptions.map((value) => StorageCapacity.create({ value }))
      );
      console.log("Storage capacities seeded.");

      const statusOptions = ["In Storage", "Sold", "Pending"];
      await Promise.all(statusOptions.map((value) => Status.create({ value })));
      console.log("Statuses seeded.");

      const models = ["Model A", "Model B"];
      await Promise.all(models.map((name) => Model.create({ name })));
      console.log("Models seeded.");

      const colors = ["Black", "White", "Blue"];
      await Promise.all(colors.map((name) => Color.create({ name })));
      console.log("Colors seeded.");

      const grades = ["Standard", "Premium"];
      await Promise.all(grades.map((name) => Grade.create({ name })));
      console.log("Grades seeded.");

      const brands = ["Brand X", "Brand Y"];
      await Promise.all(brands.map((name) => Brand.create({ name })));
      console.log("Brands seeded.");

      const ramIds = await Ram.findAll({ attributes: ["id"] });
      const storageIds = await StorageCapacity.findAll({ attributes: ["id"] });
      const statusIds = await Status.findAll({ attributes: ["id"] });
      const modelIds = await Model.findAll({ attributes: ["id"] });
      const colorIds = await Color.findAll({ attributes: ["id"] });
      const gradeIds = await Grade.findAll({ attributes: ["id"] });
      const brandIds = await Brand.findAll({ attributes: ["id"] });

      const devices = [
         {
            imei: "123456789012345",
            serial_number: "SN001",
            ram_id: ramIds[0].id,
            storage_capacity_id: storageIds[0].id,
            purchase_date: new Date(),
            status_id: statusIds[0].id,
            model_id: modelIds[0].id,
            color_id: colorIds[0].id,
            grade_id: gradeIds[0].id,
            brand_id: brandIds[0].id,
            notes: "Sample device 1",
         },
         {
            imei: "123456789012346",
            serial_number: "SN002",
            ram_id: ramIds[1].id,
            storage_capacity_id: storageIds[1].id,
            purchase_date: new Date(),
            status_id: statusIds[1].id,
            model_id: modelIds[1].id,
            color_id: colorIds[1].id,
            grade_id: gradeIds[1].id,
            brand_id: brandIds[1].id,
            notes: "Sample device 2",
         },
      ];

      await Promise.all(devices.map((device) => Device.create(device)));
      console.log("Devices seeded.");
   } catch (error) {
      console.error("Error seeding database:", error);
   } finally {
      await sequelize.close();
      console.log("Database connection closed.");
   }
}

seed();
