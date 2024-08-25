const express = require("express");

const {
   getColors,
   getColor,
   createColor,
   updateColor,
   deleteColor,
} = require("../controllers/colorController");

const router = express.Router();

router.route("/").get(getColors).post(createColor);

router.route("/:id").get(getColor).patch(updateColor).delete(deleteColor);

module.exports = router;
