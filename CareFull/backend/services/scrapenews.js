import puppeteer from "puppeteer";

exports.scrapeHealthNews = async (req, res) => {
    let browser = null;
    try {
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        
        // Set navigation timeout
        await page.setDefaultNavigationTimeout(30000);
        
        // Navigate to WHO news page
        await page.goto("https://www.who.int/news-room", {
            waitUntil: "networkidle2"
        });

        // Extract news data
        const news = await page.evaluate(() =>
            Array.from(document.querySelectorAll(".list-view--item"), (el) => ({
                title: el.querySelector(".heading")?.innerText || "No title found",
                link: el.querySelector("a")?.href || "#",
                // Optional: Extract more data if needed
                date: el.querySelector(".timestamp")?.innerText || "No date found"
            }))
        );

        await browser.close();
        res.json({ success: true, count: news.length, data: news });
    } catch (error) {
        console.error("Scraping error:", error);
        res.status(500).json({ success: false, error: error.message });
    } finally {
        // Ensure browser closes even if there's an error
        if (browser) {
            await browser.close().catch(console.error);
        }
    }
};