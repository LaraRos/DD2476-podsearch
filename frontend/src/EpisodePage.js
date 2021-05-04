import React from 'react';
import Logo from './Logo.js'
import {fetchEpisode, fetchEpisodeMetadata} from './search'
import {Redirect} from 'react-router-dom'
import TranscriptView from './TranscriptView.js'
import {markKeyWords} from './functions.js'

function EpisodePage({queryString, episodeResults, setEpisodeResults, podcastName, resetParams}) {

    
    const getAllPodcastData = async ()=>{
        fetchEpisodeMetadata(podcastName).then(meta_data => {
            if(!meta_data){
                return false
            }
            fetchEpisode(podcastName).then(res =>{
    
                const episode_res = res.hits.hits

                const podcaststring = []
                const res2 = episode_res.sort((a,b) => {
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
                for(let i=0; i<res2.length;i++){
                    podcaststring.push(res2[i])
                }
                setEpisodeResults({transcript:podcaststring,metaData:meta_data})
            })
        })
    }
    if(! episodeResults || episodeResults.transcript.length === 0){
        getAllPodcastData()
    }
    console.log("yey")
    const metadata = episodeResults?.metaData?.hits?.hits[0]?._source
    return (
        episodeResults === "" || episodeResults === undefined || episodeResults === []? <Redirect to={String('')}/>:
        metadata?
            <div className="episodeInfo">
                <Logo resetParams={resetParams} className="resultheader"/>
                <div className="total_pod_title" style={{marginBottom:'10vh'}}>
                    <h1><b>{metadata.podcast_name}</b></h1>
                    <div>
                    <div style={{float: 'left', paddingRight:"20px", paddingBottom:"5vh"}}>
                        <iframe src={"https://open.spotify.com/embed/episode/"+metadata.episode}  width="400" height="250" backgroundColor="blue" frameborder="0" allowtransparency="true" allow="encrypted-media" marginBottom="0" scrolling="no"></iframe>
                    </div>
                    <div>
                        <div style={{fontStyle:'italic'}}>{metadata.episode_name}</div>
                        <br/>
                        <div>{metadata.episode_description}</div>
                        <br/>
                        <div>Duration: <b>{metadata.duration.split(".")[0]} minutes</b></div>
                    </div>
                    </div>
                </div>
                <hr></hr>
                <div className="total_podcast">{episodeResults.transcript?.map(transcript => <TranscriptView transcript={markKeyWords(transcript._source.data, queryString, queryString,false)} startTime={transcript._source.start} endTime={transcript._source.end}/>)}</div>
            </div> :<div></div>
    );
}
export default EpisodePage;