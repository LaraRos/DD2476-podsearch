import React, {useState} from 'react';
import Logo from './Logo.js'
import SearchField from './SearchField.js'
import Podcast from './Podcast.js'

function ResultPage({queryString, setQueryString, searchResult, setSearchResult}) {
    const hits = searchResult? searchResult.hits.hits: []
    const [maxNrHits, setNrHits] = useState(10);
    
    return (
        <div className="App">
            <div className="grid-container">
                <div className="resultheader">
                    <Logo/>
                </div>
                <div>
                    <div className="resultSearchField">
                        <SearchField queryString={queryString} setQueryString={setQueryString} setSearchResult={setSearchResult}/>
                    </div>
                    <div style={{
                        marginTop:"1vh",
                        color:"silver",
                        fontSize:"12px"
                        }}>
                        Found {hits.length} results ({searchResult?searchResult.took:0} seconds)
                    </div>
                    <div className="hits"> 
                        {hits.length === 0 ? <div></div> : hits.slice(0, Math.min(hits.length,maxNrHits)).map(h => <Podcast hit={h} queryString={queryString}/>)}
                    </div>
                    {maxNrHits > hits.length ? "" : 
                    <button className="showMoreButton" onClick={() => {setNrHits(maxNrHits + 10)}}>
                        View more
                    </button>
                    }
                </div>
            </div>
            
        </div>
    );
}

export default ResultPage;
