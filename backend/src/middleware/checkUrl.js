const ApiError = require("../utils/ApiError");
const { validURL } = require("../utils/commonUtils");

const urlValidator = (req, res, next) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    throw new ApiError(`Please enter URL`, 400);
  }
  if (!validURL(originalUrl)) {
    throw new ApiError(`Invalid URL: ${originalUrl}`);
  }
  next();
};

module.exports = urlValidator;
