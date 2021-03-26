const client = require('./connection.js');
const INDEX = 'podcast_test'

const getClusterHealth = () => {
    client.cluster.health({},function(err,resp,status) {  
        console.log("-- Client Health --",resp);
      });
}

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

const addDocById = async (docId, payload) => {
    
}

const searchTranscript = async (transcript) => {
    console.info("Searching transcripts with >>> " + transcript + " <<<...")
    let body = {
        size: 200,
        from: 0,
        query: {
          match: {
              "results.alternatives.transcript": transcript
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

module.exports = { 
    getClusterHealth,
    getDocById,
    searchTranscript,
    deleteDocById
} 

