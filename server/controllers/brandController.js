const { Sequelize } = require("sequelize");
const { Brand } = require("../models");

// Get all brands
const getBrands = async (req, res) => {
   try {
      const brands = await Brand.findAll();
      res.status(200).json(brands);
   } catch (error) {
      console.error("Error fetching brands:", error.message);
      res.status(500).json({
         error: "An error occurred while fetching brands",
      });
   }
};

// Get a single brand by ID
const getBrand = async (req, res) => {
   try {
      const { id } = req.params;
      const brand = await Brand.findOne({
         where: { id: id },
      });
      if (brand) {
         res.status(200).json(brand);
      } else {
         res.status(404).json({ error: "Brand not found" });
      }
   } catch (error) {
      console.error("Error fetching brand:", error.message);
      res.status(500).json({
         error: "An error occurred while fetching the brand",
      });
   }
};

// Create a new brand
const createBrand = async (req, res) => {
   try {
      const brand = await Brand.create(req.body);
      res.status(201).json(brand); // 201 Created status
   } catch (error) {
      console.error("Error creating brand:", error.message);
      res.status(500).json({
         error: "An error occurred while creating the brand",
      });
   }
};

// Update an existing brand
const updateBrand = async (req, res) => {
   try {
      const { id } = req.params;
      const [updated] = await Brand.update(req.body, {
         where: { id: id },
      });
      if (updated) {
         const updatedBrand = await Brand.findOne({ where: { id: id } });
         res.status(200).json(updatedBrand);
      } else {
         res.status(404).json({ error: "Brand not found" });
      }
   } catch (error) {
      console.error("Error updating brand:", error.message);
      res.status(500).json({
         error: "An error occurred while updating the brand",
      });
   }
};

// Delete a brand
const deleteBrand = async (req, res) => {
   try {
      const { id } = req.params;
      const deleted = await Brand.destroy({
         where: { id: id },
      });
      if (deleted) {
         res.status(204).send(); // No Content
      } else {
         res.status(404).json({ error: "Brand not found" });
      }
   } catch (error) {
      console.error("Error deleting brand:", error.message);
      res.status(500).json({
         error: "An error occurred while deleting the brand",
      });
   }
};

module.exports = {
   getBrands,
   getBrand,
   createBrand,
   updateBrand,
   deleteBrand,
};

// const { Sequelize } = require("sequelize");
// const { Brand } = require("../models");

// const getBrands = async (req, res) => {
//    try {
//       const brands = await Brand.findAll();
//       res.json(brands);
//    } catch (error) {
//       res.status(500).json({ error: error.message });
//    }
// };

// const getBrand = async (req, res) => {
//    try {
//       const { id } = req.params;
//       const brand = await Brand.findOne({
//          where: { id: id },
//       });
//       res.json(brand);
//    } catch (error) {
//       res.status(500).json({ error: error.message });
//    }
// };

// const createBrand = async (req, res) => {
//    try {
//       const brand = await Brand.create(req.body);
//       res.json(brand);
//    } catch (error) {
//       res.status(500).json({ error: error.message });
//    }
// };

// const updateBrand = async (req, res) => {
//    try {
//       const { id } = req.params;
//       const [updated] = await Brand.update(req.body, {
//          where: { id: id },
//       });
//       if (updated) {
//          const updatedBrand = await Brand.findOne({ where: { id: id } });
//          return res.status(200).json(updatedBrand);
//       }
//       throw new Error("Brand not found");
//    } catch (error) {
//       return res.status(500).send(error.message);
//    }
// };

// const deleteBrand = async (req, res) => {
//    try {
//       const { id } = req.params;
//       const deleted = await Brand.destroy({
//          where: { id: id },
//       });
//       if (deleted) {
//          return res.status(204).send("Brand deleted");
//       }
//       throw new Error("Brand not found");
//    } catch (error) {
//       return res.status(500).send(error.message);
//    }
// };

// module.exports = {
//    getBrands,
//    getBrand,
//    createBrand,
//    updateBrand,
//    deleteBrand,
// };
