const scrape = require('./src/scrape');
const serve = require('./src/serve');

//main debugging
// (async () => {
//   await serve(() => {
//     send: () => {};
//     json: () => {};
//   });
// })();

exports.pangram = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  const { cron } = req.query;
  let response = {};

  if (cron) {
    response = await scrape(res);
  } else {
    response = await serve(res);
  }

  res.status(200).send(response);
};
