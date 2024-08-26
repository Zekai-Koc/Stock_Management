const express = require("express");

const {
   getDevices,
   getDevice,
   createDevice,
   updateDevice,
   deleteDevice,
   bulkCreateDevices,
} = require("../controllers/deviceController");

const router = express.Router();

router.route("/").get(getDevices).post(createDevice);

router.route("/:imei").get(getDevice).patch(updateDevice).delete(deleteDevice);

router.route("/bulk").post(bulkCreateDevices);

module.exports = router;
