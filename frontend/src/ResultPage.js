import React, {useState} from 'react';
import Logo from './Logo.js'
import SearchField from './SearchField.js'
import Podcast from './Podcast.js'

const merge_transcripts = (t1, t2, start_time, end_time) => {
    
    const res = {
        _score:Math.max(t1._score, t2._score),
        _source:{
            data: t1._source.data + t2._source.data,
            podcast_name:t1._source.podcast_name,
            start:String(start_time+"s"),
            end:String(end_time+"s")
        }
    }

    return res
}

const formatHits = (hits) => {
    hits = hits.sort((a,b) => {
        if(a._source.podcast_name === b._source.podcast_name){
            return 0
        }
        else if(a._source.podcast_name > b._source.podcast_name){
            return 1
        }
        else if(a._source.podcast_name < b._source.podcast_name){
            return -1
        }
    })
    let hits_res = []
    let last_trans = hits[0]
    for(let i=1; i<hits.length;i++){
        const start_this = parseInt((hits[i]._source.start).slice(0,hits[i]._source.start.length-1))
        const end_this = parseInt((hits[i]._source.end).slice(0,hits[i]._source.end.length-1))
        const start_last = parseInt((last_trans._source.start).slice(0,last_trans._source.start.length-1))
        const end_last = parseInt((last_trans._source.end).slice(0,last_trans._source.end.length-1))
        const start = Math.min(start_this,start_last)
        const end = Math.max(end_this, end_last)

        if(hits[i]._source.podcast_name === last_trans._source.podcast_name && (start-end) < 120){
            last_trans = merge_transcripts(last_trans, hits[i], start, end)
        }
        else{
            hits_res.push(last_trans)
            last_trans = hits[i]
        }
    }
    hits_res.push(last_trans)
    hits_res.sort((a,b) => a._score < b._score)
    return hits_res
}

function ResultPage({searchType, setSearchType, clickedButton, setClickedButton, queryString, setQueryString, searchResult, setSearchResult, podcastName, setPodcastName}) {
    const maybe_hits = searchResult? searchResult.hits.hits: []
    const [maxNrHits, setNrHits] = useState(10);
    const hits  = maybe_hits? formatHits(maybe_hits) : hits
    return (
        <div className="App">
            <div className="grid-container">
                <div className="resultheader">
                    <Logo setClickedButton={setClickedButton} setSearchResult={setSearchResult} className="resultheader"/>
                </div>
                <div>
                    <div className="resultSearchField">
                        <SearchField setSearchType={setSearchType} searchType={searchType} queryString={queryString} setQueryString={setQueryString} setSearchResult={setSearchResult}/>
                    </div>
                    <div style={{
                        marginTop:"1vh",
                        color:"silver",
                        fontSize:"12px"
                        }}>
                        Found {hits.length} results ({searchResult?searchResult.took:0} seconds)
                    </div>
                    <div className="hits">
                        {hits.length === 0 ? <div ></div> : hits.slice(0, Math.min(hits.length,maxNrHits)).map(h => <Podcast hit={h} queryString={queryString} clickedButton={clickedButton} setClickedButton={setClickedButton} podcastName={podcastName} setPodcastName={setPodcastName}/>)}
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