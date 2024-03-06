const ApiError = require("../utils/ApiError");
const { checkMissingKeys } = require("../utils/commonUtils");

const keyValidator = (requiredKeys) => {
  return (req, res, next) => {
    const missingKeys = checkMissingKeys(requiredKeys, req.body);
    if (missingKeys.length > 0) {
      throw new ApiError(`Missing field: ${missingKeys.join(", ")}`);
    }
    next();
  };
};

module.exports = keyValidator;
