import React, {useState} from 'react';
import Logo from './Logo.js'
import SearchField from './SearchField.js'
import Podcast from './Podcast.js'
import {Redirect} from 'react-router-dom'
import {GrLinkNext} from 'react-icons/gr';
import {GrLinkPrevious} from 'react-icons/gr';

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

function compare( a, b ) {
    return b._score - a._score
  }

function rank(hits) {
    var i;
    const alpha = 0.8;
    const beta = 0.2;
    for (i = 0; i < hits.length; i++){
        hits[i]._score = alpha*hits[i]._score + beta*hits[i]._source.confidence;
   }
   return hits.sort( compare )
  }

  function bestPod(hits, nbr_relevant) {
    var dict= {};
    var relevant = [];
    var i;
    var j;
    for (i = 0; i < hits.length; i++){
        if (hits[i]._source.podcast_name in dict) {
            dict[i] += 1;
        } else {
            dict[i] = 1;
        }
   }

   for (j = 0; j < Math.min(nbr_relevant,hits.length); j++){
        var max_key = Object.keys(dict).reduce(function(a, b){ return dict[a] > dict[b] ? a : b });
        relevant.push(hits[max_key]);
        dict[max_key] = 0;
   }

   return relevant
  }

const formatHits = (hits) => {
    if(hits.length === 0){
        return []
    }
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

function ResultPage({searchType, setSearchType, queryString, setQueryString, searchResult, setSearchResult, podcastName, setPodcastName, resetParams}) {
    const [maxNrHits, setNrHits] = useState(10);
    const [num, setNum] = React.useState(12);
    
    if(searchResult === undefined || searchResult == "" ){
        searchResult = {took:0,hits:{hits:[]}}
    }
    const maybe_hits = rank(searchResult.hits.hits)

    const hits  = maybe_hits? formatHits(maybe_hits) : hits
    const best_Podcasts = bestPod(maybe_hits, num) 
    console.log(hits)
    return (
        podcastName != "" ? <Redirect to={String('/episode/'+ podcastName)}/> :
        searchResult == "" ? <Redirect to={String('')}/> :
        <div className="App">
            <div className="grid-container">
                <div className="resultheader">
                    <Logo className="resultheader" resetParams={resetParams}/>
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
                        Found {hits.length} results ({searchResult?(searchResult.took)/100:0} seconds)
                    </div>
                    {hits.length === 0 ? <div></div> : 
                    <div>
                        <h2>Top results </h2>
                        <div style={{marginLeft:'8vw',display: 'grid',gridTemplateColumns:'55vw 5vw',gridGap:'1vw'}}>
                            <div className="bestPods">
                                    {best_Podcasts.length === 0 ? <div ></div> : 
                                    best_Podcasts.map(pod => 
                                        <Podcast hit={pod} queryString={queryString} setPodcastName={setPodcastName} phraseQuery={searchType==="phrase"}/>
                                        )}
                            </div>
                            <button onClick={() => num < 12 ? setNum(num+3) : "" }style={{backgroundColor:'transparent', border:'none'}}><GrLinkNext/></button>
                        </div>
                        <br/> <br/>    
                        <hr></hr>     
                        <div className="hits">
                            {hits.length === 0 ? <div ></div> : hits.slice(0, Math.min(hits.length,maxNrHits)).map(h => <Podcast hit={h} queryString={queryString} setPodcastName={setPodcastName} phraseQuery={searchType==="phrase"}/>)}
                        </div>
                        {maxNrHits > hits.length ? "" : 
                        <button className="showMoreButton" onClick={() => {setNrHits(maxNrHits + 10)}}>
                            View more
                        </button>
                        }
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default ResultPage;
