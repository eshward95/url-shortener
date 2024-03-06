const Url = require("../models/url.model");
const { objectIdToBase10 } = require("../utils/commonUtils");
const { encoder } = require("../utils/encoding");

const generateShortUrl = async (originalUrl) => {
  const existingUrl = await Url.isUrlPresent(originalUrl);
  if (existingUrl) {
    return existingUrl;
  }
  try {
    let url = await Url.create({ originalUrl });
    const insertedId = url.get("_id");

    // Convert ObjectId to base-10 integer and then to base-58
    const base10Id = objectIdToBase10(insertedId);
    const shortUrlId = encoder(base10Id);
    url = await Url.findByIdAndUpdate(
      { _id: insertedId },
      { shortUrl: shortUrlId },
      { new: true }
    );

    return url;
  } catch (err) {
    console.log(err);
  }
};

const redirectUrl = async (shortUrl) => {
  let existingUrl = await Url.findOne({ shortUrl: shortUrl });
  return existingUrl;
};

const deleteUrl = async (shortUrl) => {
  const existingUrl = await Url.isUrlPresent(shortUrl);
  if (!existingUrl) {
    return existingUrl;
  }
  return await Url.deleteOne({ shortUrl: shortUrl });
};

const getAllUrl = async () => {
  return await Url.find();
};

module.exports = { redirectUrl, deleteUrl, generateShortUrl, getAllUrl };
