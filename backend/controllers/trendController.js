const getTrendingTopics = require("../utils/getTrendingTopics");
const slugify = require("slugify");
const Article = require("../models/Article");
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

exports.generateTrendingArticles = async (req, res) => {
  try {
    const topics = await getTrendingTopics();
    const results = [];

    for (const topic of topics) {
      const slug = slugify(topic, { lower: true });
      const existing = await Article.findOne({ slug });

      if (existing) {
        console.log(`✅ Skipping existing article: "${topic}"`);
        continue;
      }

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
        slug,
        meta: `Trending: ${topic}`,
        content,
        media: [],
        isTrending: true,
      });

      results.push(article);
    }

    res.status(201).json({
      message: "✅ Articles created from Google Trends",
      articles: results,
    });
  } catch (err) {
    console.error("Trend Gen Error:", err);
    res.status(500).json({ error: "Failed to generate trending articles" });
  }
};
