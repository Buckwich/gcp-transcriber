# Transcriber

Wrapper for Googles Speech to Text API optimzed for transcribing interviews

## Requirements

* NodeJS
* Google Cloud Access (free 300$ trial available)

## Preperation

* The audio should be a mono FLAC file. Video or Audio can be converted for example with VLC. 
* If the audio is lontger than 1 minute it needs to be uploaded to a google cloud storage bucket
  * Create a bucket: https://console.cloud.google.com/storage/
  * Upload file to bucket
* Follow this guide for authentication: https://cloud.google.com/docs/authentication/getting-started

## Installation & Usage

Initial install: `npm i`

Set the URI in `analyze.js` to your audio file in the bucket and run `npm run analyze`. You can also change options like language or speaker count here. This operation can take up to half the time of the original audio length.

You can then use `npm run format` to convert the raw response to a textfile. You can change the output in `format.js` without the need to run the analysis again.

```bash
npm i # Install dependencies
npm run analyze # Analyse audio on google Cloud and store result in raw.json
npm run format # Format response to readable output
```

## Clean up

To save resources you should remove the audio file from the storage bucket if it is no longer needed.
