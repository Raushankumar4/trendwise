const axios = require("axios");

async function getTrendingTopics() {
  const apiKey = process.env.NEWSDATA_API_KEY;

  try {
    const response = await axios.get(
      `https://newsdata.io/api/1/news?country=in&language=en&apikey=${apiKey}`
    );

    const articles = response.data.results;
    const topics = articles.slice(0, 5).map((a) => a.title);
    return topics;
  } catch (err) {
    console.error("❌ Failed to fetch from NewsData API:", err.message);
    return [];
  }
}

module.exports = getTrendingTopics;
