const axios = require('axios');
const cheerio = require('cheerio');

exports.scrapeHealthSchemes = async () => {
  try {
    // Replace with the actual URL of the government health schemes page
    const response = await axios.get('https://www.example.gov/health-schemes');
    const html = response.data;
    const $ = cheerio.load(html);
    const schemes = [];
    
    $('.scheme-item').each((i, element) => {
      const title = $(element).find('.scheme-title').text().trim();
      const description = $(element).find('.scheme-description').text().trim();
      const link = $(element).find('a').attr('href');
      schemes.push({ title, description, link });
    });
    return schemes;
  } catch (error) {
    console.error('Error scraping health schemes:', error);
    throw error;
  }
};
