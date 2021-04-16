// let newData = { results: [{transcript, start, end, confidentiality}] }

const fs = require('fs');
const folder = process.argv[2]
const target = process.argv[3]
const folderName = "/podcasts-no-audio-13GB/spotify-podcasts-2020/podcasts-transcripts"
let temp = 0

const nextFiles = (currentFolder) => {
    return fs.readdirSync(currentFolder)
}

const writeToFile = (payload, target) => {
    const text = JSON.stringify(payload)
    // console.log(text)
    fs.writeFileSync(target, text, 'utf8', function (err) {
        // console.log("writing " + text)
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    });
}

const completeData = (result) => {
    return result && result.alternatives && result.alternatives[0] && result.alternatives[0].transcript && result.alternatives[0].confidence && result.alternatives[0].words
}

// First layer of folders
const firstFolders = nextFiles(folder + folderName)
firstFolders.forEach(firstFolder => {
    if (firstFolder !== '.DS_Store') {
        // Second layer of folders
        secondFolders = nextFiles(folder + folderName + "/" + firstFolder)
        secondFolders.forEach(secondFolder => {
            if (secondFolder !== '.DS_Store') {
                console.log(firstFolder + "/" + secondFolder)
                // Third layer of folders
                thirdFolders = nextFiles(folder + folderName + "/" + firstFolder + "/" + secondFolder)
                thirdFolders.forEach(thirdFolder => {
                    if (thirdFolder !== '.DS_Store') {
                        files = nextFiles(folder + folderName + "/" + firstFolder + "/" + secondFolder + "/" + thirdFolder)
                        files.forEach(file => {
                            let newData = {podcast_name : file.substring(0, file.length - 5)}
                            console.log(file)
                            const data = JSON.parse(fs.readFileSync(folder + folderName + "/" + firstFolder + "/" + secondFolder + "/" + thirdFolder + "/" + file));
                            let transcripts = []
                            data.results.forEach((result) => {
                                if (completeData(result)) {
                                    let temp = {
                                        // add transcript
                                        transcript: result.alternatives[0].transcript,
                                        // add confidence
                                        confidence: result.alternatives[0].confidence,
                                        // add start time
                                        start: result.alternatives[0].words[0].startTime,
                                        // add end time
                                        end: result.alternatives[0].words[(result.alternatives[0].words.length - 1)].endTime
                                    }
                                transcripts.push(temp)
                                }
                            })
                            newData.transcripts = transcripts
                            // console.log("writing... ")
                            const fileName = target + "/" + firstFolder + "/" + secondFolder + "/" + thirdFolder

                            if (!fs.existsSync(target + "/" + temp)){
                                console.log("creating new folder")
                                fs.mkdirSync(target + "/" + temp);
                            }
                            writeToFile(newData, target + "/" + temp + "/" + file)
                            count += count + 1
                            if (count == 10000) {
                                temp = temp + 1
                            }
                            
                        })
        
                    } 
        
                })

            }
        })

    }
})