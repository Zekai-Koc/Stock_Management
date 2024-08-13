const { Sequelize } = require("sequelize");
const {
   Brand,
   Model,
   Status,
   RAM,
   Storage,
   Color,
   Grade,
   Catalog,
} = require("../models");

exports.getAllSelectOptions = async (req, res) => {
   try {
      const brands = await Brand.findAll({
         attributes: ["id", "name"],
      });

      const models = await Model.findAll({
         attributes: ["id", "name", "brandId"],
      });

      const statuses = await Status.findAll({
         attributes: ["id", "name"],
      });

      const rams = await RAM.findAll({
         attributes: ["id", "name"],
      });

      const storages = await Storage.findAll({
         attributes: ["id", "name"],
      });

      const colors = await Color.findAll({
         attributes: ["id", "name"],
      });

      const grades = await Grade.findAll({
         attributes: ["id", "name"],
      });

      const catalogs = await Catalog.findAll({
         attributes: ["id", "name"],
      });

      res.json({
         brands,
         models,
         statuses,
         rams,
         storages,
         colors,
         grades,
         catalogs,
      });
   } catch (error) {
      console.error("Error fetching select options:", error);
      res.status(500).json({ error: "Internal Server Error" });
   }
};
