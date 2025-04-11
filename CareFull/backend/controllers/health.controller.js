// controllers/newsController.js or wherever it's located

import { scrapeHealthNews } from '../services/scrapeNews.js';
import { scrapeHealthSchemes } from '../services/scrapeSchemes.js';

export const getHealthNews = async (req, res) => {
  try {
    const news = await scrapeHealthNews();
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getHealthSchemes = async (req, res) => {
  try {
    const schemes = await scrapeHealthSchemes();
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
