const express = require("express");

const {
   getAllDevices,
   getDevice,
   createDevice,
   updateDevice,
   deleteDevice,
   checkID,
   checkBody,
   getDeviceStats,
} = require("../controllers/deviceController");

const router = express.Router();

router.param("id", checkID);

router.route("/").get(getAllDevices).post(checkBody, createDevice);

router.route("/stats").get(getDeviceStats);

router.route("/:IMEI").get(getDevice).patch(updateDevice).delete(deleteDevice);

module.exports = router;
