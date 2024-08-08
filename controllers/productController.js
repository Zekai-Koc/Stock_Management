const checkID = (req, res, next, val) => {
   console.log(`Product id is: ${val}`);

   if (req.params.id * 1 > products.length) {
      return res.status(404).json({
         status: "fail",
         message: "Invalid ID",
      });
   }
   next();
};

const checkBody = (req, res, next) => {
   if (!req.body.name || !req.body.price) {
      return res.status(400).json({
         status: "fail",
         message: "Missing name or price",
      });
   }
   next();
};

const getAllProducts = (req, res) => {
   res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      count: products.length,
      data: products,
   });
};

const getProduct = (req, res) => {
   console.log(req.params);
   // const id = req.params.id * 1;
   const id = req.params.id;
   const product = products.find((el) => el._id === id);

   if (!product) {
      return res.status(404).json({
         status: "fail",
         message: "Invalid ID",
      });
   }

   res.status(200).json({
      status: "success",
      data: { product },
   });
};

const createProduct = (req, res) => {
   console.log(req.body);
   res.status(201).json({
      status: "success",
      data: {
         product: "<New product here...>",
      },
   });
};

const updateProduct = (req, res) => {
   res.status(200).json({
      status: "success",
      data: {
         product: "<Updated product here...>",
      },
   });
};

const deleteProduct = (req, res) => {
   res.status(204).json({
      status: "success",
      data: null,
   });
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this line to parse JSON bodies

// Serve the HTML page for adding a new mobile
app.get("/add-mobile", (req, res) => {
   res.sendFile(path.join(__dirname, "add-mobile.html"));
});

// Create a new mobile
app.post("/add-mobile", async (req, res) => {
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
});

// Read all mobiles
app.get("/mobiles", async (req, res) => {
   try {
      const mobiles = await Mobile.findAll();
      res.json(mobiles);
   } catch (error) {
      console.error("Error fetching mobiles:", error);
      res.status(500).send("Error fetching mobiles");
   }
});

// Read a specific mobile by IMEI
app.get("/mobiles/:IMEI", async (req, res) => {
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
});

// Update a mobile by IMEI
app.put("/mobiles/:IMEI", async (req, res) => {
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
});

// Delete a mobile by IMEI
app.delete("/mobiles/:IMEI", async (req, res) => {
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
});

module.exports = {
   getAllProducts,
   getProduct,
   createProduct,
   updateProduct,
   deleteProduct,
   checkID,
   checkBody,
};
