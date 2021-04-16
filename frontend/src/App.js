import React from 'react';
import {useState} from 'react';
import {fetchQuery} from './search'

function App() {
  const [queryString, setQueryString] = useState("")
  return (
    <div className="App">
      <h1>
        Podcast search
      </h1>
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
