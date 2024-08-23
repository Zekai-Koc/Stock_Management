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
<<<<<<< HEAD
   uploadFromExcel,
=======
   uploadDevicesFromExcel
>>>>>>> 97af1bdd5e1476cff807c58ae6867b7ec7f648ba
} = require("../controllers/deviceController");

const router = express.Router();

router.param("id", checkID);

router.route("/").get(getAllDevices).post(checkBody, createDevice);

router.route("/:IMEI").get(getDevice).patch(updateDevice).delete(deleteDevice);
router.route("/updatedevicestatus/:IMEI").patch(updateDeviceStatus);

<<<<<<< HEAD
router.route("/uploadfromexcel").post(checkBody, uploadFromExcel);
=======
router.route("/upload-excel").post(uploadDevicesFromExcel)
>>>>>>> 97af1bdd5e1476cff807c58ae6867b7ec7f648ba

module.exports = router;
