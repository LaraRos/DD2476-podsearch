export const markKeyWords = (data, queryString, trim=true) => {
    let currentWord = ""
    const separator = /(\s|\.|\,|\!\?)/
    let data_marked = []
    const getAllCharacters = trim ? data.length <=300 : true 
    const slice = getAllCharacters ? data.length : 300

    const queryWords = queryString.split(" ").map(q => q.toLowerCase())
    data.slice(0,slice).split("").map(char => {
        if(separator.test(char)){
            queryWords?.includes(currentWord.toLowerCase()) ? data_marked.push(<b>{currentWord}</b>) : data_marked.push(currentWord)
            data_marked.push(char)
            currentWord = ""
        }
        else{
            currentWord += char
        }
    })

    return data_marked
}