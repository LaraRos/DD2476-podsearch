import React from 'react';
import {useState} from 'react';
import {fetchQuery} from './search'

function App() {
  const [queryString, setQueryString] = useState("")
  const colors = ['#4285F4','#DB4437','#F4B400','#4285F4','#0F9D58', '#DB4437']
  return (
    <div className="App">
      <div className="header">
        {'PodcastSearch'.split('').map((c,i) => 
        <span style={{color: colors[i%colors.length]}}>
        {c}
        </span>
        )}
      </div>
        <input 
          type='text'
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
        />
        <button onClick={async () => console.log(await fetchQuery(queryString))}>
          search
        </button>
    </div>
  );
}

export default App;
