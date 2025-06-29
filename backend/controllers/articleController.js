const { CohereClient } = require("cohere-ai");
const slugify = require("slugify");
const Article = require("../models/Article");

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

exports.generateArticle = async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  try {
    const prompt = `
Write a comprehensive, SEO-optimized blog article about the topic: "${topic}".

Requirements:
- Catchy and clickable title under 70 characters
- Concise meta description (max 160 characters) summarizing the article
- Clear structure with H1 (title), multiple H2 headings, and at least two H3 subheadings
- Use engaging and informative language suitable for a general audience
- Include relevant references to YouTube videos or image placements in the content (use markdown syntax to embed or link media)
- Provide practical insights, examples, or recent developments related to the topic
- End with a strong conclusion and a call-to-action encouraging reader engagement
- Format the entire article in clean markdown, using proper headings, bullet points, and links where applicable
`;

    const response = await cohere.generate({
      model: "command",
      prompt,
      maxTokens: 1000,
      temperature: 0.7,
    });

    const content = response.generations[0].text;

    const article = await Article.create({
      title: topic,
      slug: slugify(topic, { lower: true }),
      meta: `SEO blog about ${topic}`,
      media: [],
      content,
    });

    res.status(201).json(article);
  } catch (err) {
    console.error("Cohere Error:", err);
    res.status(500).json({ error: "Failed to generate article" });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (err) {
    console.error("GetAll Error:", err);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
};

exports.getArticleBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const article = await Article.findOne({ slug });

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json(article);
  } catch (err) {
    console.error("GetBySlug Error:", err);
    res.status(500).json({ error: "Failed to fetch article" });
  }
};
