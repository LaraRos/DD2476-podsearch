import React from 'react';
import {useState} from 'react';
import ResultPage from './ResultPage.js'
import SearchPage from './SearchPage.js'
import Test from './Test.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  const [queryString, setQueryString] = useState("")

  return(
  <BrowserRouter>
  <Switch>
    <Route path="/search" render={() => {return <ResultPage queryString={queryString} setQueryString={setQueryString}/>}}/>
    <Route path="" render={() => {return <SearchPage queryString={queryString} setQueryString={setQueryString}/>}} />
  </Switch>
</BrowserRouter>
  )
}

export default App;
