const express = require("express");
const morgan = require("morgan");

const Mobile = require("./models/mobile");

const mobileRouter = require("./routes/mobileRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
   app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/mobiles", mobileRouter);

module.exports = app;
