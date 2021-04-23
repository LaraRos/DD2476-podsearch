import React, {useState} from 'react';
import  { Redirect } from 'react-router-dom'
import Logo from './Logo.js'
import SearchField from './SearchField.js'

function ResultPage({queryString, setQueryString, searchResult, setSearchResult}) {
    const [redirect, setRedirect] = useState(false)
    const hits = searchResult.hits.hits

    return (
        redirect ? <Redirect to={String('/dfdfs')} /> : 
        <div className="App">
            <div className="grid-container">
                <div className="resultheader" onClick = {() => setRedirect(true)}>
                    <Logo/>
                </div>
                <div className="resultSearchField">
                    <SearchField queryString={queryString} setQueryString={setQueryString} setSearchResult={setSearchResult}/>
                </div>
            </div>
            <div className="hits"> 
                {hits.length === 0 ? <div>No results</div> : hits.map(h => <div>{h._source.podcast_name} : {h._source.data} <br/></div>)}
            </div>
        </div>
    );
}

/*





*/

export default ResultPage;
