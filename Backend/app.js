const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "Config", "config.env") });
const router = require("./Router/Product");
const order = require("./Router/order");
const auth = require("./Router/auth");
const payment = require("./Router/payment");

const errorMidleWare = require("./MiddleWares/error");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/", router);
app.use("/api/v1/", auth);
app.use("/api/v1/", order);
app.use("/api/v1/", payment);

if (process.env.NODE_ENV==='production') {
  console.log('production');
    app.use(express.static(path.join(__dirname, "../fron/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../fron/build/index.html"));
    });
}

app.use(errorMidleWare);
module.exports = app;
