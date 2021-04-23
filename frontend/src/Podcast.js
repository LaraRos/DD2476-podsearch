import React from 'react';
import {Redirect} from 'react-router-dom'

function markKeywords(data, queryString){
    const res = data.split(" ").map(word =>
        queryString.includes(word) ? <b>{word + " "}</b> : word + " "
    )
    return res
}
function Podcast({hit, queryString, clickedButton, setClickedButton}) {
    return(
        clickedButton ? <Redirect to={String('/episode')}/> :
        <div className="episode_grid">
                <button style={{
                        height:"5vh",
                        width:"30vw",
                        marginTop:"3vh",
                        marginBottom:"3vh",
                        backgroundColor:"white",
                        borderRadius: "20px",
                        border:"5px",
                        boxShadow: "0 0 3px rgb(117, 117, 117)"
                        }}
                        onClick={() => {setClickedButton(true)} }
                    >
                        <div className="grid-item1">{hit._source.podcast_name}</div>
                    </button>
            <div className="grid-item2">{markKeywords(hit._source.data, queryString)}</div>
        </div>
    )
}

export default Podcast;