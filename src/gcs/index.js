const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const fs = require('fs').promises;

const bucketName = 'pangrams';

const uploadJSONtoBucket = async json => {
  const filename = '/tmp/tmp.json';

  try {
    await fs.writeFile(filename, json);
  } catch (e) {
    throw e;
  }

  try {
    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      destination: 'pangram.json',
      // By setting the option `destination`, you can change the name of the
      // object you are uploading to a bucket.
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: 'public, max-age=31536000'
      }
    });
  } catch (e) {
    throw e;
  } finally {
    try {
      await fs.unlink(filename);
      console.log(`successfully deleted ${filename}`);
    } catch (e) {
      throw e;
    }
  }

  console.log(`${filename} uploaded to ${bucketName}.`);
};

const getJSONfromBucket = async () => {
  const srcFilename = 'pangram.json';
  const destFilename = '/tmp/pangram.json';

  const options = {
    // The path to which the file should be downloaded, e.g. "./file.txt"
    destination: destFilename
  };

  // Downloads the file
  await storage
    .bucket(bucketName)
    .file(srcFilename)
    .download(options);

  console.log(
    `gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`
  );
};

module.exports = {
  uploadJSONtoBucket,
  getJSONfromBucket
};
