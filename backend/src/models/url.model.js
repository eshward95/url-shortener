const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shortUrlSchema = new Schema(
  {
    originalUrl: { type: String, required: true },
    shortUrl: { type: String },
    hits: { type: Number, default: 0 },
  },
  { timestamps: true }
);
//unique: true is set to ensure that the index enforces uniqueness of
//  the shortUrl values — no two documents
// in the collection can have the same value for the shortUrl field
shortUrlSchema.index({ shortUrl: 1 }, { unique: true });
shortUrlSchema.statics.isUrlPresent = async function (urlToCheck) {
  let url;
  try {
    url = await this.findOne({
      $or: [{ originalUrl: urlToCheck }, { shortUrl: urlToCheck }],
    });
  } catch (err) {
    console.error("An error occurred while checking URL presence:", err);
    throw err; // Re-throw the error if you want calling code to handle it.
  }
  return url;
};

const Url = mongoose.model("Url", shortUrlSchema);
module.exports = Url;
