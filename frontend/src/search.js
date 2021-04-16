// 
const ENDPOINT = 'http://localhost:3001'

export const fetchQuery = async (query) => {
    const data = await fetch(ENDPOINT+"/search?string="+query)
    const res = await data.json()
    return res
}