import React, {useEffect, useState} from 'react';
import {markKeyWords} from './functions.js'
import { fetchEpisodeMetadata } from './search.js';

function Podcast({hit, queryString, setPodcastName, phraseQuery}) {
    const start = hit? parseInt((hit._source.start).slice(0,hit._source.start.length-1)) : 0
    const end = hit?parseInt((hit._source.end).slice(0,hit._source.end.length-1)):0
    const startTime = hit?parseInt(start/60):0
    const startTime_s = hit?parseInt(start%60):0
    const endTime = hit?parseInt(end/60):0
    const endTime_s = hit?parseInt(end%60):0
    const [podcastData, setPodcastData] = useState("")
    const [currentPod, setCurrentPod] = useState("")

    const getPodcastData = async ()=>{
        if(!hit || currentPod === hit._source.episode_name){
            return ""
        }

        fetchEpisodeMetadata(hit._source.episode_name).then(meta_data =>{
            setPodcastData(meta_data)
            setCurrentPod(hit._source.episode_name)
        })
    }

    useEffect(() => {
        if(currentPod !== hit._source.episode_name){
            getPodcastData()
        }
    })

    const metadata = podcastData.hits? podcastData.hits?.hits[0]?._source : undefined

    return(
        hit?
        <button className="episode_grid" onClick={() => {setPodcastName(hit._source.episode_name)}}>
            <div className="grid-item1">{podcastData.hits?.hits[0]?._source?.podcast_name}</div>
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