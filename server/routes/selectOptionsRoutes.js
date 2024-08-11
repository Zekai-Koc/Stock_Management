const express = require("express");

const {
   getAllSelectOptions,
} = require("../controllers/selectOptionsController");

const router = express.Router();

router.route("/").get(getAllSelectOptions);

module.exports = router;
