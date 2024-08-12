const express = require("express");

const { getStatusCounts } = require("../controllers/statusStatsController");

const router = express.Router();

router.route("/").get(getStatusCounts);

module.exports = router;
