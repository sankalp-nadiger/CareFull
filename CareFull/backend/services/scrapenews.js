const puppeteer = require("puppeteer");

exports.scrapeHealthNews = async (req, res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://www.who.int/news-room");

        const news = await page.evaluate(() =>
            Array.from(document.querySelectorAll(".list-view--item"), (el) => ({
                title: el.querySelector(".heading").innerText,
                link: el.querySelector("a").href,
            }))
        );

        await browser.close();
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
