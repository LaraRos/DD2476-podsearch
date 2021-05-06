import React, {useState} from 'react';
import {fetchQuery, fetchPhraseQuery} from './search'


const handleKeyDown = async (e, setQueryString, setSearchResult, searchType) => {
    if(e.key === 'Enter'){
        if(searchType==="intersection"){
            setSearchResult(await fetchQuery(e.target.value))
        }
        else{
            setSearchResult(await fetchPhraseQuery(e.target.value))
        }
        setQueryString(e.target.value)
    }
}


function SearchField({setSearchType={setSearchType}, searchType={searchType}, setQueryString, setSearchResult}) {
    const handleCheck = () => {
        if(searchType === "intersection"){
            setSearchType("phrase")
        }
        else{
            setSearchType("intersection")
        }
    }

    const [writtenQuery, setWrittenQuery] = useState("")

    return (
        <div>
            <input className="input"
            type='text'
            value={writtenQuery}
            onChange={async (e) => {setWrittenQuery(e.target.value)}}
            onKeyDown={(e) => handleKeyDown(e, setQueryString, setSearchResult, searchType)}
            />
            <label class="switch">
                <input type="checkbox" onChange={handleCheck}/>
                Phrasequery
            </label>
        </div>
    )
}

export default SearchField;