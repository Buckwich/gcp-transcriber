
const fs = require('fs');

const name = process.argv[2]
console.log(name);

let response = require(`./${name}.json`);

console.log(`Speaker Diarization:`);
const result = response.results[response.results.length - 1];


const wordsInfo = result.alternatives[0].words;

currentSpeaker = 0
currentLine = ""

var wstream = fs.createWriteStream(`${name}.txt`);
wordsInfo.forEach(a => {
  if (currentSpeaker !== a.speakerTag) {
    wstream.write(`SPEAKER${currentSpeaker}: ${currentLine}\n`)
    currentLine = ""
    currentSpeaker = a.speakerTag

  }
  currentLine = currentLine + " " + a.word
}
);
wstream.write(`SPEAKER${currentSpeaker}: ${currentLine}\n`)
wstream.end();