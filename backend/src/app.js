const express = require("express");
const routes = require("./routes/url.route");
const globalErrorHandler = require("./utils/Error");

const app = express();
app.use(express.json());

app.use("/", routes);

app.all("/", (req, res) => {
  res.status(200).json({ status: "success" });
});
app.use(globalErrorHandler);

module.exports = app;
