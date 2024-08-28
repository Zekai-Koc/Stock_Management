// ./routes/deviceRoutes.js

const express = require("express");

const {
   getDevices,
   getDevice,
   createDevice,
   updateDevice,
   deleteDevice,
   bulkCreateDevices,
   getDeviceStatistics,
   getDevicesWithLogs,
   updateDeviceStatus,
   getTotalCostForCatalog,
} = require("../controllers/deviceController");

const router = express.Router();

router.route("/").get(getDevices).post(createDevice);

router.route("/getDevicesWithLogs").get(getDevicesWithLogs);

router.route("/stats").get(getDeviceStatistics);
router.route("/getTotalCostForCatalog").get(getTotalCostForCatalog);

router.route("/:id").get(getDevice).patch(updateDevice).delete(deleteDevice);

router.route("/updatedevicestatus/:imei").patch(updateDeviceStatus);

router.route("/bulk").post(bulkCreateDevices);

module.exports = router;
