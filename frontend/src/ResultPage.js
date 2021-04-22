import React from 'react';
import {useState} from 'react';

function ResultPage(props) {

    const [res, setRes] = useState(["res1", "res2", "res3", "res4", "res5", "res6", "res7", "res8", "res9", "res10"])
    return (
        <div className="App">
            <div className="header">
                {'PodcastSearch'.split('').map((c,i) => 
                <span style={{color: props.colors[i%props.colors.length]}}>
                {c}
                </span>
                )}
            </div>
            <form className="commentForm"onSubmit={(e) => props.setQueryString(e.target.value)}>
                <input className="input"
                    type='text'
                    value={props.queryString}
                    onChange={(e) => props.setQueryString(e.target.value)}
                />
            </form>
            <div className="ResultBox">
                {res.map((r) => <div>{r}</div>)}
            </div>
        </div>
    );
}


export default ResultPage;
