// 
const ENDPOINT = 'https://c28937b7423d.ngrok.io'

export const fetchQuery = async (query) => {
    const data = await fetch(ENDPOINT+"/search?string="+query)
    const res = await data.json()
    return res
}

export const fetchPhraseQuery = async (query) => {
    const data = await fetch(ENDPOINT+"/phrasesearch?string="+query)
    const res = await data.json()
    return res  
}

export const fetchPodcast = async (podcast) => {
    const data = await fetch(ENDPOINT+"/getpodcast?podcast="+podcast)
    const res = await data.json()
    return res    
}

export const fetchEpisode = async (episode) => {
    const data = await fetch(ENDPOINT+"/getepisode?episode="+episode)
    const res = await data.json()
    return res    
}

export const fetchPodcastMetadata = async (podcast) => {
    const data = await fetch(ENDPOINT+"/getpodcastmetadata?podcast="+podcast)
    const res = await data.json()
    return res    
}

export const fetchEpisodeMetadata = async (episode) => {
    const data = await fetch(ENDPOINT+"/getepisodemetadata?episode="+episode)
    const res = await data.json()
    return res    
}