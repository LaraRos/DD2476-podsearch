import React, {useState} from 'react';
import Logo from './Logo.js'
import SearchField from './SearchField.js'
import Podcast from './Podcast.js'

function EpisodePage({queryString, setQueryString, searchResult, setSearchResult}) {
    const hits = searchResult.hits.hits
    const [maxNrHits, setNrHits] = useState(10);

    return (
        <div className="App">
            <div className="grid-container">
                <div className="resultheader">
                    <Logo/>
                    EPISODEPAGE
                </div>
                <div>
                    <div className="resultSearchField">
                        <SearchField queryString={queryString} setQueryString={setQueryString} setSearchResult={setSearchResult}/>
                    </div>
                    <div className="hits"> 
                        {hits.length === 0 ? <div>No results</div> : hits.slice(0, Math.min(hits.length,maxNrHits)).map(h => <Podcast hit={h}/>)}
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default EpisodePage;