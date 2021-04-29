import React, {useState} from 'react';
import {Redirect} from 'react-router-dom'
import {markKeyWords} from './functions.js'
import { fetchEpisodeMetadata, fetchPodcastMetadata } from './search.js';

function Podcast({hit, queryString, clickedButton, setClickedButton, podcastName, setPodcastName, phraseQuery}) {
    
    const start = hit? parseInt((hit._source.start).slice(0,hit._source.start.length-1)) : 0
    const end = hit?parseInt((hit._source.end).slice(0,hit._source.end.length-1)):0
    const startTime = hit?parseInt(start/60):0
    const startTime_s = hit?parseInt(start%60):0
    const endTime = hit?parseInt(end/60):0
    const endTime_s = hit?parseInt(end%60):0
    const [podcastData, setPodcastData] = useState("")

    const getPodcastData = async ()=>{
        if(!hit){
            return ""
        }
        const meta_data = await fetchPodcastMetadata(hit._source.podcast_name)
        setPodcastData(meta_data)
    }
    if(podcastData === ""){
        getPodcastData()
    }
    const metadata = podcastData.hits? podcastData.hits.hits.filter(h => h._source.episode === hit._source.episode_name)[0]?._source : undefined
    return(
        clickedButton ? <Redirect to={String('/episode/'+ hit._source.podcast_name)}/> :
        hit?
        <button className="episode_grid" onClick={() => {setClickedButton(true); setPodcastName(hit._source.podcast_name)}}>
            <div className="grid-item1">{metadata?.podcast_name}</div>
            <div className="episode_name">{metadata?.episode_name}</div>
            <div className="grid-item2">
                {startTime} m {startTime_s} s - {endTime} m {endTime_s} s
            </div>
            <div className="grid-item3">{markKeyWords(hit._source.data, queryString, phraseQuery)}</div>
        </button>
        : <div></div>
    )
}

export default Podcast;