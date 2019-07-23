const puppeteer = require('puppeteer');

const scrapeBee = async () => {
  // Needs to be set in GCP.
  const url = process.env.SCRAPE_URL;

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url);
  const pangrams = (await page.$$('strong')) || [];

  await browser.close();

  return pangrams.length;
};

module.exports = {
  scrapeBee
};
