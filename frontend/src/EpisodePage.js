import React, {useState} from 'react';
import Logo from './Logo.js'
import SearchField from './SearchField.js'
import Podcast from './Podcast.js'
import {fetchQuery, fetchPodcast, fetchPodcastMetadata} from './search'
import {markKeyWords} from './functions.js'
import {Redirect} from 'react-router-dom'
import TranscriptView from './TranscriptView.js'

function EpisodePage({clickedButton, setClickedButton, episodeResults, setEpisodeResults, queryString, setQueryString, searchResult, setSearchResult, podcastName}) {
    const ep = podcastName
    const [podcastData, setPodcastData] = useState("")

    const getAllPodcastData = async ()=>{
        const res = await fetchPodcast(ep)
        var podcaststring = []
        const res2 = res.hits.hits.sort((a,b) => {
            if(parseInt(a._id) === parseInt(b._id)){
                return 0
            }
            else if(parseInt(a._id) > parseInt(b._id)){
                return 1
            }
            else if(parseInt(a._id) < parseInt(b._id)){
                return -1
            }
        })
        for(let i=0; i<res.hits.hits.length;i++){
            podcaststring.push(res2[i])
        }
        const meta_data = await fetchPodcastMetadata(podcastName)
        setPodcastData(meta_data)

        return podcaststring
    }

    if(episodeResults === ""){
        getAllPodcastData().then(e => {setEpisodeResults(e)})
    }

    const end = episodeResults !== "" && episodeResults.length > 0 && episodeResults !== undefined ? parseInt((episodeResults[episodeResults.length - 1]._source.end)?.slice(0,episodeResults[episodeResults.length - 1]._source.end.length-1)) : 0
    const endTime_m = parseInt(end/60)
    const endTime_s = parseInt(end%60)
    return (
        episodeResults === "" || episodeResults === undefined || episodeResults === []? <div></div>:
        !clickedButton ? <Redirect to={String('')}/> :
        <div className="App">
            <button onClick={() => {setClickedButton(false)}}>
                <Logo className="resultheader"/>
            </button>
            <div className="total_pod_title">
                Title: <b>{episodeResults[0]?._source.podcast_name}</b>
                <br/><br/>
                Time Length: <b>{endTime_m}:{endTime_s}</b>
            </div>
            <div className="total_podcast">{episodeResults?.map(transcript => <TranscriptView transcript={markKeyWords(transcript._source.data, queryString, queryString,false)} startTime={transcript._source.start} endTime={transcript._source.end}/>)}</div>
        </div>
    );
}

export default EpisodePage;