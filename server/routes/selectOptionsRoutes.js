const express = require("express");

const {
   getAllSelectOptions,
   getStatusOptions
} = require("../controllers/selectOptionsController");

const router = express.Router();

router.route("/").get(getAllSelectOptions);
router.route("/statuses").get(getStatusOptions);

module.exports = router;
