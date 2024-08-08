const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// const path = require("path");
const Mobile = require("./mobile");

const productRouter = require("./routes/productRoutes");
// const userRouter = require("./routes/userRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
   app.use(morgan("dev"));
}

module.exports = app;
