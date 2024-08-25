const { Catalog } = require("../models");

// Get all catalogs
const getCatalogs = async (req, res) => {
   try {
      const catalogs = await Catalog.findAll();
      res.status(200).json(catalogs);
   } catch (error) {
      console.error("Error fetching catalogs:", error.message);
      res.status(500).json({
         error: "An error occurred while fetching catalogs",
      });
   }
};

// Get a single catalog by ID
const getCatalog = async (req, res) => {
   try {
      const { id } = req.params;
      const catalog = await Catalog.findOne({
         where: { id: id },
      });
      if (catalog) {
         res.status(200).json(catalog);
      } else {
         res.status(404).json({ error: "Catalog not found" });
      }
   } catch (error) {
      console.error("Error fetching catalog:", error.message);
      res.status(500).json({
         error: "An error occurred while fetching the catalog",
      });
   }
};

// Create a new catalog
const createCatalog = async (req, res) => {
   try {
      const catalog = await Catalog.create(req.body);
      res.status(201).json(catalog); // 201 Created status
   } catch (error) {
      console.error("Error creating catalog:", error.message);
      res.status(500).json({
         error: "An error occurred while creating the catalog",
      });
   }
};

// Update an existing catalog
const updateCatalog = async (req, res) => {
   try {
      const { id } = req.params;
      const [updated] = await Catalog.update(req.body, {
         where: { id: id },
      });
      if (updated) {
         const updatedCatalog = await Catalog.findOne({ where: { id: id } });
         res.status(200).json(updatedCatalog);
      } else {
         res.status(404).json({ error: "Catalog not found" });
      }
   } catch (error) {
      console.error("Error updating catalog:", error.message);
      res.status(500).json({
         error: "An error occurred while updating the catalog",
      });
   }
};

// Delete a catalog
const deleteCatalog = async (req, res) => {
   try {
      const { id } = req.params;
      const deleted = await Catalog.destroy({
         where: { id: id },
      });
      if (deleted) {
         res.status(204).send(); // No Content
      } else {
         res.status(404).json({ error: "Catalog not found" });
      }
   } catch (error) {
      console.error("Error deleting catalog:", error.message);
      res.status(500).json({
         error: "An error occurred while deleting the catalog",
      });
   }
};

module.exports = {
   getCatalogs,
   getCatalog,
   createCatalog,
   updateCatalog,
   deleteCatalog,
};
