

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech').v1p1beta1;
const fs = require('fs');

const name = process.argv[2]
console.log(name);

// Creates a client
const client = new speech.SpeechClient();

const config = {
  // encoding: `LINEAR16`,
  // sampleRateHertz: 8000,
  languageCode: `de-DE`,
  "alternativeLanguageCodes": [
    "en-US"
  ],
  "diarizationConfig": {
    "enableSpeakerDiarization": true,
    "minSpeakerCount": 2,
    "maxSpeakerCount": 2,
  },
  "enableAutomaticPunctuation": true,
  useEnhanced: true
  // model: `phone_call`,
};

const audio = {
  "uri": `gs://storage.buckwich.de/${name}.flac`
};

const request = {
  config: config,
  audio: audio,
};


async function main() {
  console.log("Starting")
  const [operation] = await client.longRunningRecognize(request);
  console.log("Operation started")
  const [response] = await operation.promise();
  console.log("Operation finished")
  let data = JSON.stringify(response);
  fs.writeFileSync(`${name}.flac`, data);

}
main();