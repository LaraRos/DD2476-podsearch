const indexFunctions = require('../info.js')
const fs = require('fs');
// Path to your reduced spotify transcript folder
const folder = ''
// replace with num of files, we only write 100 files right now
// const count = 10

const nextFiles = (currentFolder) => {
    return fs.readdirSync(currentFolder)
}

const files = nextFiles(folder)
let transcriptCount = 0

for (i = 0; i < files.length; i++) {
    const file = files[i]
    const data = JSON.parse(fs.readFileSync(folder + "/" + file));
    const numTranscripts = data.transcripts.length
    const promises = []
    for (j = 0; j < numTranscripts; j++) {
        let newData = {
            podcast_name: data.podcast_name,
            data: data.transcripts[j].transcript,
            start: data.transcripts[j].start,
            end: data.transcripts[j].end,
            offset: j
        }
        // try {
        //     await indexFunctions.addDocById(transcriptCount, newData)
        // } catch (e) {
        //     console.error(e)
        // }
        promises.push(indexFunctions.addDocById(transcriptCount, newData))
        transcriptCount = transcriptCount + 1
    }
    console.info("Logged " + count + " files")
}