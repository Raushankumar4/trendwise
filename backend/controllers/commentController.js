const Comment = require("../models/Comments");

exports.postComment = async (req, res) => {
  const { articleSlug, text, user } = req.body;

  if (!user?.email) return res.status(401).json({ error: "Not authenticated" });

  try {
    const comment = await Comment.create({ articleSlug, user, text });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: "Failed to post comment" });
  }
};

exports.getComments = async (req, res) => {
  const { slug } = req.params;

  try {
    const comments = await Comment.find({ articleSlug: slug }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

exports.getUserComments = async (req, res) => {
  const { email } = req.params;

  if (!email) return res.status(400).json({ error: "Email required" });

  try {
    const comments = await Comment.find({ "user.email": email }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user comments" });
  }
};
