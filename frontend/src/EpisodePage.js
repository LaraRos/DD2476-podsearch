import React, {useState} from 'react';
import Logo from './Logo.js'
import SearchField from './SearchField.js'
import Podcast from './Podcast.js'
import {fetchQuery, fetchPodcast} from './search'
import {markKeyWords} from './functions.js'
import {Redirect} from 'react-router-dom'
import TranscriptView from './TranscriptView.js'

function EpisodePage({clickedButton, setClickedButton, episodeResults, setEpisodeResults, queryString, setQueryString, searchResult, setSearchResult, podcastName}) {
    const ep = podcastName
    console.log(clickedButton)
    if(episodeResults === ""){
        
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
            return podcaststring
        }

        const getPodcastData = async ()=>{
            const res = await fetchQuery(queryString)
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
            console.log(res2)
            res2.filter(trans => trans._source.podcast_name === ep).map(trans =>{
                console.log("yey")
                podcaststring.push(trans)
            })

            return podcaststring
        }

        getAllPodcastData().then(e => {setEpisodeResults(e)})
    }

    
    const end = episodeResults !== "" && episodeResults !== undefined ? parseInt((episodeResults[episodeResults.length - 1]._source.end).slice(0,episodeResults[episodeResults.length - 1]._source.end.length-1)) : 0
    const endTime_m = parseInt(end/60)
    const endTime_s = parseInt(end%60)

    return (
        episodeResults === "" || episodeResults === undefined ? <div></div>:
        !clickedButton ? <Redirect to={String('')}/> :
        <div className="App">
            <button onClick={() => {setClickedButton(false)}}>
                <Logo className="resultheader"/>
            </button>
            <div className="total_pod_title">
                Title: <b>{episodeResults[0]._source.podcast_name}</b>
                <br/><br/>
                Time Length: <b>{endTime_m}:{endTime_s}</b>
            </div>
            <div className="total_podcast">{episodeResults.map(transcript => <TranscriptView transcript={markKeyWords(transcript._source.data, queryString, false)} startTime={transcript._source.start} endTime={transcript._source.end}/>)}</div>
        </div>
    );
}

export default EpisodePage;