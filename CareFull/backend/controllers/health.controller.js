const { scrapeHealthNews } = require('../services/scrapeNews');

exports.getHealthNews = async (req, res) => {
  try {
    const news = await scrapeHealthNews();
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const { scrapeHealthSchemes } = require('../services/scrapeSchemes');

exports.getHealthSchemes = async (req, res) => {
  try {
    const schemes = await scrapeHealthSchemes();
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};