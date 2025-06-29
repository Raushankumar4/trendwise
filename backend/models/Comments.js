const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    articleSlug: String,
    user: {
      name: String,
      email: String,
      image: String,
    },
    text: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
