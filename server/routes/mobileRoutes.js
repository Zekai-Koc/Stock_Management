const express = require("express");

const {
   getAllMobiles,
   getMobile,
   createMobile,
   updateMobile,
   deleteMobile,
   checkID,
   checkBody,
} = require("../controllers/mobileController");

const router = express.Router();

router.param("id", checkID);

router.route("/").get(getAllMobiles).post(checkBody, createMobile);

router.route("/:IMEI").get(getMobile).patch(updateMobile).delete(deleteMobile);

module.exports = router;
