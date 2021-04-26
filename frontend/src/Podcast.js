import React, {useState} from 'react';
import {Redirect} from 'react-router-dom'
import {markKeyWords} from './functions.js'

function Podcast({hit, queryString, clickedButton, setClickedButton, podcastName, setPodcastName}) {
    const start = hit? parseInt((hit._source.start).slice(0,hit._source.start.length-1)) : 0
    const end = hit?parseInt((hit._source.end).slice(0,hit._source.end.length-1)):0
    const startTime = hit?parseInt(start/60):0
    const startTime_s = hit?parseInt(start%60):0
    const endTime = hit?parseInt(end/60):0
    const endTime_s = hit?parseInt(end%60):0

    return(
        clickedButton ? <Redirect to={String('/episode/'+ podcastName)}/> :
        hit?
        <button className="episode_grid" onClick={() => {setClickedButton(true); setPodcastName(hit._source.podcast_name)}}>
            <div className="grid-item1">{hit._source.podcast_name}</div>
            <div className="grid-item2">
                {startTime} m {startTime_s} s - {endTime} m {endTime_s} s
            </div>
            <div className="grid-item3">{markKeyWords(hit._source.data, queryString)}</div>
        </button>
        : <div></div>
    )
}

export default Podcast;