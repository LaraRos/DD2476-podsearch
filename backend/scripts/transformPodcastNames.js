const fs = require('fs');
// Path to your reduced spotify transcript folder
const fileName = '/Users/lara/Documents/Courses/VT21/ir/project/podcasts-no-audio-13GB/metadata.tsv'
const target = '/Users/lara/Documents/Courses/VT21/ir/project/podcasts-no-audio-13GB/podcasts-metadata'
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
const file = fs.readFileSync(fileName, 'utf-8').split('\n')
for (i = 1; i < file.length; i++) {
    nextLine = file[i].split('\t')
    data = {
        podcast: nextLine[0].substring(13, nextLine[0].length),
        podcast_name: nextLine[1],
        description: nextLine[2],
        publisher: nextLine[3],
        language: nextLine[4],
        episode: nextLine[6].substring(16, nextLine[6].length),
        episode_name: nextLine[7],
        episode_description: nextLine[8],
        duration: nextLine[9]
    }
    writeToFile(data, target + "/" + data.episode)
}

