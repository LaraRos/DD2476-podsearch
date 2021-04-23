import React from 'react';
import {fetchQuery} from './search'
import {useState} from 'react';

const handleKeyDown = async (e, queryString, setSearchResult) => {
    if(e.key === 'Enter'){
        setSearchResult(await fetchQuery(queryString))
    }
}
function SearchField({queryString, setQueryString, setSearchResult}) {
    return (
        <input className="input"
        type='text'
        value={queryString}
        onChange={async (e) => {setQueryString(e.target.value)}}
        onKeyDown={(e) => handleKeyDown(e, queryString, setSearchResult)}
        />
    )
}

export default SearchField;