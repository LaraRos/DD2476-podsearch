
function getIndicesOf(searchStr, str, caseSensitive) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        const start= index;
        const end = index + searchStrLen;
        startIndex = end
        indices.push({start:start, end:end});
    }
    return indices;
}

export const markKeyWords = (data, queryString, phraseQuery=false, trim=true) => {
    if(queryString === ""){
        return []
    }
    let data_marked = []
    let matches = []
    const getAllCharacters = trim ? data.length <=300 : true 
    const slice = getAllCharacters ? data.length : 300
    const data_slice = data.slice(0,slice)

    const queryString_splitted = phraseQuery? [queryString.trim()] :queryString.split(" ")

    const queryWords = queryString_splitted.filter((val, id) => queryString_splitted.indexOf(val) == id).map(q => q.toLowerCase())
    var ind = 0;
    const transcript_data = data_slice.toLowerCase()
    queryWords.map(word => {
        var ind = 0;
        var start = -1
        var end = -1
        while((start = (transcript_data.slice(ind,data_slice.length)).indexOf(word)) != -1){
            end = start+word.length
            matches.push({start:ind+start, end:ind+end})
            ind += end;
        }
    })

    ind = 0
    matches = matches.sort((a,b) => {
        if(a.start > b.start) return 1
        else if (a.start < b.start) return -1
        else return 0
    })
    matches.map(match => {
        data_marked.push(data_slice.slice(ind,match.start))
        data_marked.push(<b>{data_slice.slice(match.start, match.end)}</b>)
        ind = match.end
    })
    data_marked.push(data_slice.slice(ind,data_slice.length))

    return data_marked
}