// 
const ENDPOINT = 'https://12b7e2725bea.ngrok.io'

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