const express = require("express");
const router = express.Router();
const { generateTrendingArticles } = require("../controllers/trendController");

router.post("/generate", generateTrendingArticles);

module.exports = router;
