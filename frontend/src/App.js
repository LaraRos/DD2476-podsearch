import React from 'react';
import {useState} from 'react';
import ResultPage from './ResultPage.js'

function App() {
  const [queryString, setQueryString] = useState("")
  const [colors, setColors] = useState(['#4285F4','#DB4437','#F4B400','#4285F4','#0F9D58', '#DB4437'])
  const [has_results, setHasResults] = useState(false);

  return (
    has_results? <ResultPage queryString={queryString} setQueryString={setQueryString} colors={colors}/> : 
    <div className="App">
      <div className="header">
        {'PodcastSearch'.split('').map((c,i) => 
        <span style={{color: colors[i%colors.length]}}>
        {c}
        </span>
        )}
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


export default App;
