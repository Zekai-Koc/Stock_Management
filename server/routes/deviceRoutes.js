const express = require("express");

const {
   getAllDevices,
   getDevice,
   createDevice,
   updateDevice,
   updateDeviceStatus,
   deleteDevice,
   checkID,
   checkBody,
   uploadDevicesFromExcel
} = require("../controllers/deviceController");

const router = express.Router();

router.param("id", checkID);

router.route("/").get(getAllDevices).post(checkBody, createDevice);

router.route("/:IMEI").get(getDevice).patch(updateDevice).delete(deleteDevice);
router.route("/updatedevicestatus/:IMEI").patch(updateDeviceStatus);

router.route("/upload-excel").post(uploadDevicesFromExcel)

module.exports = router;
