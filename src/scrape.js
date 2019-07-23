const { scrapeBee } = require('./puppeteer/find');
const { uploadJSONtoBucket } = require('./gcs');

module.exports = async res => {
  let amountOfPangrams;

  try {
    amountOfPangrams = await scrapeBee();
  } catch (e) {
    throw e;
  }

  console.log(`Pangrams today: ${amountOfPangrams}`);

  try {
    await uploadJSONtoBucket(
      JSON.stringify({ count: amountOfPangrams, date: new Date() })
    );
  } catch (e) {
    throw e;
  }

  return { status: 200 };
};
