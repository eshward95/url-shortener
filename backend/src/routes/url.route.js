const express = require("express");
const {
  create,
  redirect,
  deleteShortUrl,
  getUrls,
} = require("../controller/url.controller");
const urlValidator = require("../middleware/checkUrl");
const keyValidator = require("../middleware/checkKey");
const router = express.Router();

router
  .route("/generate")
  .post(keyValidator(["originalUrl"]), urlValidator, create);
router.route("/all").get(getUrls);
router.route("/:id").get(redirect).delete(deleteShortUrl);

module.exports = router;
