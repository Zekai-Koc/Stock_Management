const express = require("express");
const morgan = require("morgan");

const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
   app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//    console.log("Hello from the middleware.  💣 😽");
//    next();
// });

app.use((req, res, next) => {
   req.requestTime = new Date().toISOString();
   console.log(req.requestTime);
   next();
});

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
