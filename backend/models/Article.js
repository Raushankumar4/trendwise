const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    meta: String,
    media: [String],
    content: String,
    isTrending: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
