const express = require("express");
const router = express.Router();
const {
  postComment,
  getComments,
  getUserComments,
} = require("../controllers/commentController");

router.post("/", postComment);
router.get("/:slug", getComments);
router.get("/user/:email", getUserComments);

module.exports = router;
