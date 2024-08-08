const express = require("express");

const {
   getAllProducts,
   getProduct,
   createProduct,
   updateProduct,
   deleteProduct,
   checkID,
   checkBody,
} = require("../controllers/productController");

const router = express.Router();

router.param("id", checkID);

router.route("/").get(getAllProducts).post(checkBody, createProduct);

router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
