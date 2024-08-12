const { Sequelize } = require("sequelize");
const Device = require("../models/Device");
const Model = require("../models/Model");

const getModelsByBrand = async (brandId) => {
   try {
      const devicesWithModels = await Device.findAll({
         attributes: [
            [Sequelize.col("Model.name"), "modelName"], // Select model name
         ],
         include: [
            {
               model: Model,
               attributes: [], // Exclude attributes of Model if not needed
               where: {
                  brandId: brandId, // Filter for the specific brandId
               },
            },
         ],
         group: ["Model.name"], // Group by model name to ensure uniqueness
         order: [["Model.name", "ASC"]], // Optional: Order results
      });

      // Extract model names
      const models = devicesWithModels.map((device) => device.get("modelName"));
      return models;
   } catch (error) {
      console.error("Error fetching models by brand:", error);
      throw error;
   }
};

module.exports = { getModelsByBrand };
