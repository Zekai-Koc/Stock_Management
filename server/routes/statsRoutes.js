const express = require("express");

const {
   getDeviceStats,
   getModelsByBrand,
   getDevicesByGrade,
   getGroupedDevicesByGrade,
   getGroupedDevicesByGradeWithCounts,
} = require("../controllers/statsController");

const router = express.Router();

router.route("/getdevicestats").get(getDeviceStats);
router.route("/getmodelsbybrand").get(getModelsByBrand);
router.route("/getdevicesbygrade").get(getDevicesByGrade);
router.route("/getgroupeddevicesbygrade").get(getGroupedDevicesByGrade);
router
   .route("/getGroupedDevicesByGradeWithCounts")
   .get(getGroupedDevicesByGradeWithCounts);

module.exports = router;
