// 
const ENDPOINT = 'http://b4038095767c.ngrok.io'

export const fetchQuery = async (query) => {
    const data = await fetch(ENDPOINT+"/search?string="+query)
    const res = await data.json()
    return res
}