const Mobile = require("../models/mobile");

// Read all mobiles
const getAllMobiles = async (req, res) => {
   console.log("getAllMobiles");
   try {
      const mobiles = await Mobile.findAll();
      res.json(mobiles);
   } catch (error) {
      console.error("Error fetching mobiles:", error);
      res.status(500).send("Error fetching mobiles");
   }
};

// Read a specific mobile by IMEI
const getMobile = async (req, res) => {
   console.log("getMobile");
   const { IMEI } = req.params;
   try {
      const mobile = await Mobile.findOne({ where: { IMEI } });
      if (mobile) {
         res.json(mobile);
      } else {
         res.status(404).send("Mobile not found");
      }
   } catch (error) {
      console.error("Error fetching mobile:", error);
      res.status(500).send("Error fetching mobile");
   }
};

// Create a new mobile
const createMobile = async (req, res) => {
   console.log("createMobile");
   const { IMEI, Model, Color, Storage, Grade, SerialNumber } = req.body;

   try {
      await Mobile.create({
         IMEI,
         Model,
         Color,
         Storage,
         Grade,
         SerialNumber,
      });
      res.send("Mobile model added successfully!");
   } catch (error) {
      console.error("Error adding mobile model:", error);
      res.status(500).send("Error adding mobile model");
   }
};

// Update a mobile by IMEI
const updateMobile = async (req, res) => {
   const { IMEI } = req.params;
   const { Model, Color, Storage, Grade, SerialNumber } = req.body;

   try {
      const mobile = await Mobile.findOne({ where: { IMEI } });
      if (mobile) {
         await mobile.update({ Model, Color, Storage, Grade, SerialNumber });
         res.send("Mobile updated successfully");
      } else {
         res.status(404).send("Mobile not found");
      }
   } catch (error) {
      console.error("Error updating mobile:", error);
      res.status(500).send("Error updating mobile");
   }
};

// Delete a mobile by IMEI
const deleteMobile = async (req, res) => {
   console.log("deleteMobile");

   const { IMEI } = req.params;

   try {
      const rowsDeleted = await Mobile.destroy({ where: { IMEI } });
      if (rowsDeleted) {
         res.send("Mobile deleted successfully");
      } else {
         res.status(404).send("Mobile not found");
      }
   } catch (error) {
      console.error("Error deleting mobile:", error);
      res.status(500).send("Error deleting mobile");
   }
};

const checkID = async (req, res, next, val) => {
   console.log(`Mobile id is: ${val}`);
   next();
};

const checkBody = async (req, res, next) => {
   console.log("Checking body");
   next();
};

module.exports = {
   getAllMobiles,
   getMobile,
   createMobile,
   updateMobile,
   deleteMobile,
   checkID,
   checkBody,
};
