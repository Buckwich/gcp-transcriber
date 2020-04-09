
let response = require('./raw.json');

// console.log(response);

console.log(`Speaker Diarization:`);
const result = response.results[response.results.length - 1];
console.log(result);

const wordsInfo = result.alternatives[0].words;
// Note: The transcript within each result is separate and sequential per result.
// However, the words list within an alternative includes all the words
// from all the results thus far. Thus, to get all the words with speaker
// tags, you only have to take the words list from the last result:
currentSpeaker = 0
currentLine = ""
wordsInfo.forEach(a => {
  if (currentSpeaker !== a.speakerTag) {
    console.log(`SPEAKER${currentSpeaker}: ${currentLine}`)
    currentLine = ""
    currentSpeaker = a.speakerTag

  }
  currentLine = currentLine + " " + a.word
  // console.log(` word: ${a.word}, speakerTag: ${a.speakerTag}`)
}
);