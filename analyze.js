

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech').v1p1beta1;

const fs = require('fs');

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
  "uri": "gs://storage.buckwich.de/example.flac"
};

const request = {
  config: config,
  audio: audio,
};

async function main() {
  console.log("Starting")
  const [operation] = await client.longRunningRecognize(request);
  console.log("Operation started")
  console.log(operation)
  const [response] = await operation.promise();
  console.log("Operation finished")
  console.log(response)
  let data = JSON.stringify(response);
  fs.writeFileSync('raw.json', data);
  console.log("Result start")
  console.log(response)
  console.log("result end")

}
main();