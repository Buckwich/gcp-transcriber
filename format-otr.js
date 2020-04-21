
const fs = require('fs');

const name = process.argv[2]
console.log(name);

let response = require(`./${name}.json`);

console.log(`Speaker Diarization:`);
const result = response.results[response.results.length - 1];


const wordsInfo = result.alternatives[0].words;

currentSpeaker = 0
currentLine = ""

var wstream = fs.createWriteStream(`${name}.otr`);
wstream.write(`{"text":"        <p>`);

wordsInfo.forEach(a => {
  if (currentSpeaker !== a.speakerTag) {
    wstream.write(`SPEAKER${currentSpeaker}: ${currentLine}</p><p><span class=\\"timestamp\\" data-timestamp=\\"${a.startTime.seconds || 0}\\">${toHHMMSS(a.startTime.seconds || 0)}</span> `)
    currentLine = ""
    currentSpeaker = a.speakerTag

  }
  currentLine = currentLine + " " + a.word
}
);
wstream.write(`SPEAKER${currentSpeaker}: ${currentLine}</p><p><br /></p><p></p><p>\\n    </p>"}`)
wstream.end();

function toHHMMSS(number) {
  var sec_num = parseInt(number, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return hours + ':' + minutes + ':' + seconds;
}