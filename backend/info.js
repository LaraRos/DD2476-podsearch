const client = require('./connection.js');
const INDEX = 'podcast_test'

// Get health of elastic
const getClusterHealth = () => {
    client.cluster.health({},function(err,resp,status) {  
        console.log("-- Client Health --",resp);
      });
}

// Fetch doc by id
const getDocById = async (docId) => {
    console.info("Fetching document with id >>> " + docId + " <<<...")
    res = await client.search({
        index: INDEX,
        "body": {
            "query": { 
                "bool": {
                 "filter": {
                        "term": {
                           "_id": docId
                        }
                    }
                }
            }
        }
    })
    return res
}

// Delete doc by id
const deleteDocById = async (docId) => {
    console.info("Deleting document with id >>> " + docId + " <<<...")
    res = await client.delete({
        index: INDEX,
        id: docId
    }).catch((err) => {
        console.error("ERROR delete: " + err.message)
    })
    return res
}

// Add doc without id
const addDoc = async (body) => {
    console.info("Adding document to index...")
    res = await client.index({
        index: INDEX,
        body
    }, function(err, resp, status) {
        console.log(resp);
    });
    console.info("Success!")
}

// Add doc with id
const addDocById = async (id, body) => {
    console.info("Adding document to index...")
    res = await client.index({
        index: INDEX,
        id,
        body
    }, function(err, resp, status) {
        console.log(resp);
    });
    console.info("Success!")
}

const searchTranscript = async (transcript) => {
    console.info("Searching transcripts with >>> " + transcript + " <<<...")
    let body = {
        size: 200,
        from: 0,
        query: {
          match: {
              "data": transcript
          }
        }
      }
    res = await client.search({
        index: INDEX,
        body: body
    })
    // .then(() => console.log("Success!")).catch((err) => console.trace(err.message))
    return res
}

const searchTranscriptPhrase = async (transcript) => {
    console.info("Phrase Searching transcripts with >>> " + transcript + " <<<...")
    let body = {
        size: 200,
        from: 0,
        query: {
          match_phrase: {
              "data": transcript
          }
        }
      }
    res = await client.search({
        index: INDEX,
        body: body
    })
    // .then(() => console.log("Success!")).catch((err) => console.trace(err.message))
    return res
}

const getPodcast = async (podcast) => {
    console.info("Searching transcripts with podcast id >>> " + podcast + " <<<...")
    let body = {
        size: 200,
        from: 0,
        query: {
          match: {
              "podcast_name": podcast
          }
        }
      }
    res = await client.search({
        index: INDEX,
        body: body
    })//.sort(offset)
    // .then(() => console.log("Success!")).catch((err) => console.trace(err.message))
    return res
}

module.exports = { 
    getClusterHealth,
    getDocById,
    searchTranscript,
    searchTranscriptPhrase,
    deleteDocById,
    getPodcast,
    addDoc,
    addDocById
} 

