const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Device = require("./models/Device");

const deviceRouter = require("./routes/deviceRoutes");
const selectOptionsRouter = require("./routes/selectOptionsRoutes");
const statusStatsRouter = require("./routes/statusStatsRoutes");
const getModelsByBrand = require("./routes/getModelsByBrandRoutes");

const app = express();
app.use(cors());

if (process.env.NODE_ENV === "development") {
   app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/devices", deviceRouter);
app.use("/api/v1/selectoptions", selectOptionsRouter);
app.use("/api/v1/statusstats", statusStatsRouter);
app.use("/api/v1/getModelsByBrand", getModelsByBrand);

module.exports = app;
