const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Device = require("./models/Device");

const deviceRouter = require("./routes/deviceRoutes");

const app = express();
app.use(cors());

if (process.env.NODE_ENV === "development") {
   app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/devices", deviceRouter);

module.exports = app;
