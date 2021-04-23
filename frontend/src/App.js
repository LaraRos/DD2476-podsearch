import React from 'react';
import {useState} from 'react';
import ResultPage from './ResultPage.js'
import SearchPage from './SearchPage.js'
import Test from './Test.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  const [queryString, setQueryString] = useState("")
  const [searchResult, setSearchResult] = useState("")
  return(
  <BrowserRouter>
  <Switch>
    <Route path="/search" render={() => {return <ResultPage queryString={queryString} setQueryString={setQueryString} searchResult={searchResult} setSearchResult={setSearchResult}/>}}/>
    <Route path="" render={() => {return <SearchPage queryString={queryString} setQueryString={setQueryString} searchResult={searchResult} setSearchResult={setSearchResult}/>}} />
  </Switch>
</BrowserRouter>
  )
}

export default App;
