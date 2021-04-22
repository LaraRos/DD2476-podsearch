import React from 'react';
import {useState} from 'react';
import Logo from './Logo.js'
function ResultPage({queryString, setQueryString}) {

    const [res, setRes] = useState(["res1", "res2", "res3", "res4", "res5", "res6", "res7", "res8", "res9", "res10"])

    return (
        <div className="App">
            <div className="grid-container">
                <div className="resultheader">
                    <Logo/>
                </div>
                <form className="commentForm"onSubmit={(e) => setQueryString(e.target.value)}>
                    <input className="input"
                        type='text'
                        value={queryString}
                        onChange={(e) => setQueryString(e.target.value)}
                    />
                </form>
            </div>
            <div className="ResultBox">
                {res.map((r) => <div>{r}</div>)}
            </div>
        </div>
    );
}

/*





*/

export default ResultPage;
