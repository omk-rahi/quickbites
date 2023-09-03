const path = require("node:path");

const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const webRouter = require("./routes/webRoutes");
const authRouter = require("./routes/api/authRoutes");
const cartRouter = require("./routes/api/cartRoutes");
const orderRouter = require("./routes/api/orderRoutes");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src", "views"));

app.use(compression());

app.use(express.static("public"));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "'unsafe-eval'"],
      },
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("combined"));

app.use("/", webRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);

app.use(errorHandler);

module.exports = app;
