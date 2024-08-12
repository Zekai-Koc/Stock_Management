const express = require("express");

const {
   getModelsByBrand,
} = require("../controllers/getModelsByBrandController");

const router = express.Router();

router.route("/").get(getModelsByBrand);

module.exports = router;
