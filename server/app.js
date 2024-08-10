const express = require("express");
const morgan = require("morgan");

const Device = require("./models/device");

const deviceRouter = require("./routes/deviceRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
   app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/devices", deviceRouter);

module.exports = app;
