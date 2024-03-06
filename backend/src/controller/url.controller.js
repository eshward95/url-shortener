const {
  generateShortUrl,
  redirectUrl,
  deleteUrl,
  getAllUrl,
} = require("../services/url.service");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

const create = catchAsync(async (req, res, next) => {
  const url = await generateShortUrl(req.body.originalUrl);
  if (!url) {
    throw new ApiError("Error while generating short url", 404);
  }
  const proto = req.headers["x-forwarded-proto"] || req.protocol;

  const BASE_URL = `${proto}://${req.get("host")}`;

  const data = {
    key: url.shortUrl,
    long_url: url.originalUrl,
    short_url: `${BASE_URL}/${url.shortUrl}`,
  };
  res.status(201).json({
    status: "success",
    data,
  });
});
const redirect = catchAsync(async (req, res, next) => {
  const url = await redirectUrl(req.params.id);
  if (!url) {
    throw new ApiError("URL not found", 404);
  }

  res.status(302).json({
    status: "success",
    data: url,
  });
});

const deleteShortUrl = catchAsync(async (req, res, next) => {
  const url = await deleteUrl(req.params.id);
  if (!url) {
    throw new ApiError("URL not found", 404);
  }
  res.status(204).send({
    status: "success",
    data: "Url deleted successfully",
  });
});

const getUrls = catchAsync(async (req, res, next) => {
  const allUrl = await getAllUrl();
  return res.status(200).json({
    status: "success",
    data: allUrl,
  });
});
module.exports = { create, redirect, deleteShortUrl, getUrls };
