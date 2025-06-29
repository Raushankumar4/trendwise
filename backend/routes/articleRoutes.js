const express = require("express");
const router = express.Router();
const {
  generateArticle,
  getAllArticles,
  getArticleBySlug,
} = require("../controllers/articleController");

router.post("/generate", generateArticle);
router.get("/", getAllArticles);
router.get("/:slug", getArticleBySlug);
module.exports = router;
