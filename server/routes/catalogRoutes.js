const express = require("express");

const {
   getCatalogs,
   getCatalog,
   createCatalog,
   updateCatalog,
   deleteCatalog,
} = require("../controllers/catalogController");

const router = express.Router();

router.route("/").get(getCatalogs).post(createCatalog);

router.route("/:id").get(getCatalog).patch(updateCatalog).delete(deleteCatalog);

module.exports = router;
