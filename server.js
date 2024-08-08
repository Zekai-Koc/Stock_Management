const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});

// // Start the server
// app.listen(port, () => {
//    console.log(`Server is running on http://localhost:${port}`);
// });

// const express = require("express");
// const bodyParser = require("body-parser");
// const path = require("path");
// const Mobile = require("./mobile");
// const sequelize = require("./database");

// const app = express();

// const port = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json()); // Add this line to parse JSON bodies

// // Serve the HTML page for adding a new mobile
// app.get("/add-mobile", (req, res) => {
//    res.sendFile(path.join(__dirname, "add-mobile.html"));
// });

// // Create a new mobile
// app.post("/add-mobile", async (req, res) => {
//    const { IMEI, Model, Color, Storage, Grade, SerialNumber } = req.body;

//    try {
//       await Mobile.create({
//          IMEI,
//          Model,
//          Color,
//          Storage,
//          Grade,
//          SerialNumber,
//       });
//       res.send("Mobile model added successfully!");
//    } catch (error) {
//       console.error("Error adding mobile model:", error);
//       res.status(500).send("Error adding mobile model");
//    }
// });

// // Read all mobiles
// app.get("/mobiles", async (req, res) => {
//    try {
//       const mobiles = await Mobile.findAll();
//       res.json(mobiles);
//    } catch (error) {
//       console.error("Error fetching mobiles:", error);
//       res.status(500).send("Error fetching mobiles");
//    }
// });

// // Read a specific mobile by IMEI
// app.get("/mobiles/:IMEI", async (req, res) => {
//    const { IMEI } = req.params;

//    try {
//       const mobile = await Mobile.findOne({ where: { IMEI } });
//       if (mobile) {
//          res.json(mobile);
//       } else {
//          res.status(404).send("Mobile not found");
//       }
//    } catch (error) {
//       console.error("Error fetching mobile:", error);
//       res.status(500).send("Error fetching mobile");
//    }
// });

// // Update a mobile by IMEI
// app.put("/mobiles/:IMEI", async (req, res) => {
//    const { IMEI } = req.params;
//    const { Model, Color, Storage, Grade, SerialNumber } = req.body;

//    try {
//       const mobile = await Mobile.findOne({ where: { IMEI } });
//       if (mobile) {
//          await mobile.update({ Model, Color, Storage, Grade, SerialNumber });
//          res.send("Mobile updated successfully");
//       } else {
//          res.status(404).send("Mobile not found");
//       }
//    } catch (error) {
//       console.error("Error updating mobile:", error);
//       res.status(500).send("Error updating mobile");
//    }
// });

// // Delete a mobile by IMEI
// app.delete("/mobiles/:IMEI", async (req, res) => {
//    const { IMEI } = req.params;

//    try {
//       const rowsDeleted = await Mobile.destroy({ where: { IMEI } });
//       if (rowsDeleted) {
//          res.send("Mobile deleted successfully");
//       } else {
//          res.status(404).send("Mobile not found");
//       }
//    } catch (error) {
//       console.error("Error deleting mobile:", error);
//       res.status(500).send("Error deleting mobile");
//    }
// });
