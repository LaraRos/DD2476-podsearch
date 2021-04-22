import React from 'react';
import {useState} from 'react';
import  { Redirect } from 'react-router-dom'
import Logo from './Logo.js'
function SearchPage({queryString, setQueryString}) {
    const [has_results, setHasResults] = useState(false);

  return (
      has_results ? <Redirect to="/search?" /> : 
    <div className="App">
      <div className="header">
        <Logo/>
      </div>
      <form className="commentForm" onSubmit={(e) => {setHasResults(true);setQueryString(e.target.value)}}>
        <input className="input"
            type='text'
            value={queryString}
            onChange={(e) => setQueryString(e.target.value)}
        />
      </form>

      <div className="infobox" type='text'>
        Information for Podcast searchers!
        <br/>Search for any content that you wish to find in a Podcast. We will
        find the best possible match for you.
      </div>
    </div>
  );
}


export default SearchPage;