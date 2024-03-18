const express = require("express");
const routes = require("./routes/url.route");
const globalErrorHandler = require("./utils/Error");

const cors = require("cors");

const app = express();
app.use(express.json());

const allowedOrigin = "http://localhost:5173";
const corsOptions = {
  origin: allowedOrigin,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify the allowed HTTP methods
  allowedHeaders: ["Content-Type"], // Specify the allowed headers
};
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self';");
  next();
});

app.use("/", routes);

app.all("/", (req, res) => {
  res.status(200).json({ message: "Welcome to url shortner api" });
});
app.use(globalErrorHandler);

module.exports = app;
