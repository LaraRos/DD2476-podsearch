import React, {useState} from 'react';
import {fetchQuery} from './search'


const handleKeyDown = async (e, setQueryString, setSearchResult) => {
    if(e.key === 'Enter'){
        setSearchResult(await fetchQuery(e.target.value))
        setQueryString(e.target.value)
    }
}
function SearchField({queryString, setQueryString, setSearchResult}) {
    const [writtenQuery, setWrittenQuery] = useState("")

    return (
        <input className="input"
        type='text'
        value={writtenQuery}
        onChange={async (e) => {setWrittenQuery(e.target.value)}}
        onKeyDown={(e) => handleKeyDown(e, setQueryString, setSearchResult)}
        />
    )
}

export default SearchField;