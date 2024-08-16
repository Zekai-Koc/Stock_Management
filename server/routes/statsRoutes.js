const express = require("express");

const {
   deviceStats,
   devicesByBrand,
   devicesByModel,
   devicesByStatus,
   devicesByRam,
   devicesByStorage,
   devicesByColor,
   devicesByGrade,
} = require("../controllers/statsController");

const router = express.Router();

router.route("/devicestats").get(deviceStats);
router.route("/devicesbybrand").get(devicesByBrand);
router.route("/devicesbymodel").get(devicesByModel);
router.route("/devicesbystatus").get(devicesByStatus);
router.route("/devicesbyram").get(devicesByRam);
router.route("/devicesbystorage").get(devicesByStorage);
router.route("/devicesbycolor").get(devicesByColor);
router.route("/devicesbygrade").get(devicesByGrade);

module.exports = router;
