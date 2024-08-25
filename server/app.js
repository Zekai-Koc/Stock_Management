const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Device = require("./models/Device");

const deviceRouter = require("./routes/deviceRoutes");
const brandRouter = require("./routes/brandRoutes");
const catalogRouter = require("./routes/catalogRoutes");
const colorRouter = require("./routes/colorRoutes");
const selectOptionsRouter = require("./routes/selectOptionsRoutes");
const statusStatsRouter = require("./routes/statusStatsRoutes");
const getModelsByBrand = require("./routes/getModelsByBrandRoutes");
const statsRouter = require("./routes/statsRoutes");

const app = express();
app.use(cors());

// if (process.env.NODE_ENV === "development") {
app.use(morgan("dev"));
// }

app.use(express.json());

app.use("/api/v1/devices", deviceRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/catalogs", catalogRouter);
app.use("/api/v1/colors", colorRouter);
app.use("/api/v1/selectoptions", selectOptionsRouter);
app.use("/api/v1/statusstats", statusStatsRouter);
app.use("/api/v1/getModelsByBrand", getModelsByBrand);
app.use("/api/v1/stats", statsRouter);

module.exports = app;
