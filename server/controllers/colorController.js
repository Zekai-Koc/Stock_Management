const { Color } = require("../models");

// Get all colors
const getColors = async (req, res) => {
   try {
      const colors = await Color.findAll();
      res.status(200).json(colors);
   } catch (error) {
      console.error("Error fetching colors:", error.message);
      res.status(500).json({
         error: "An error occurred while fetching colors",
      });
   }
};

// Get a single color by ID
const getColor = async (req, res) => {
   try {
      const { id } = req.params;
      const color = await Color.findOne({
         where: { id: id },
      });
      if (color) {
         res.status(200).json(color);
      } else {
         res.status(404).json({ error: "Color not found" });
      }
   } catch (error) {
      console.error("Error fetching color:", error.message);
      res.status(500).json({
         error: "An error occurred while fetching the color",
      });
   }
};

// Create a new color
const createColor = async (req, res) => {
   try {
      const color = await Color.create(req.body);
      res.status(201).json(color); // 201 Created status
   } catch (error) {
      console.error("Error creating color:", error.message);
      res.status(500).json({
         error: "An error occurred while creating the color",
      });
   }
};

// Update an existing color
const updateColor = async (req, res) => {
   try {
      const { id } = req.params;
      const [updated] = await Color.update(req.body, {
         where: { id: id },
      });
      if (updated) {
         const updatedColor = await Color.findOne({ where: { id: id } });
         res.status(200).json(updatedColor);
      } else {
         res.status(404).json({ error: "Color not found" });
      }
   } catch (error) {
      console.error("Error updating color:", error.message);
      res.status(500).json({
         error: "An error occurred while updating the color",
      });
   }
};

// Delete a color
const deleteColor = async (req, res) => {
   try {
      const { id } = req.params;
      const deleted = await Color.destroy({
         where: { id: id },
      });
      if (deleted) {
         res.status(204).send(); // No Content
      } else {
         res.status(404).json({ error: "Color not found" });
      }
   } catch (error) {
      console.error("Error deleting color:", error.message);
      res.status(500).json({
         error: "An error occurred while deleting the color",
      });
   }
};

module.exports = {
   getColors,
   getColor,
   createColor,
   updateColor,
   deleteColor,
};
