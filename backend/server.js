const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const indexFunctions = require('./info.js')

app.use(cors())

// Needs to be here to read request body
// acquired from stack overflow
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = 3001 

app.get('/', (req, res) => res.send("Hello World!"))

app.get('/get', async (req, res) => {
    console.log(req.query.id)
    var json = await indexFunctions.getDocById(req.query.id)
    res.send(json)
})

app.get('/search', async (req, res) => {
    var json = await indexFunctions.searchTranscript(req.query.string)
    res.send(json)
})

app.get('/phrasesearch', async (req, res) => {
    var json = await indexFunctions.searchTranscriptPhrase(req.query.string)
    res.send(json)
})

app.get('/getpodcast', async (req, res) => {
    var json = await indexFunctions.getPodcast(req.query.podcast)
    res.send(json)
})

app.get('/getpodcastmetadata', async (req, res) => {
    var json = await indexFunctions.getPodcastMetadata(req.query.podcast)
    res.send(json)
})

app.get('/delete', async (req, res) => {
    var json = await indexFunctions.deleteDocById(req.query.id)
    res.send(json)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))