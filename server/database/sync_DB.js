const sequelize = require("../database/database");
const Brand = require("../models/Brand");
const Model = require("../models/Model");
const RAM = require("../models/RAM");
const Storage = require("../models/Storage");
const Status = require("../models/Status");
const Grade = require("../models/Grade");
const Device = require("../models/Device");
const Color = require("../models/Color");
const Catalog = require("../models/Catalog");

// Sync all models
sequelize
   .sync({ alter: true }) // Use { force: true } to drop tables and recreate them
   .then(() => {
      console.log("Database synchronized successfully.");
   })
   .catch((error) => {
      console.error("Error syncing database:", error);
   });
