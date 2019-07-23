const path = require('path');
const { getJSONfromBucket } = require('./gcs');

// determine root dir
global.__basedir = __dirname;

module.exports = async res => {
  let pangramJSON = {};

  try {
    await getJSONfromBucket();
  } catch (e) {
    throw e;
  }

  try {
    pangramJSON = require(path.resolve('/tmp/pangram.json'));
  } catch (e) {
    console.log('unable to read pangram json file');
  }

  return JSON.stringify(pangramJSON);
};
