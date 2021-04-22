import React from 'react';
import {useState} from 'react';
import ResultPage from './ResultPage.js'
import SearchPage from './SearchPage.js'
import Test from './Test.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  const [queryString, setQueryString] = useState("")
  const [colors, setColors] = useState(['#4285F4','#DB4437','#F4B400','#4285F4','#0F9D58', '#DB4437'])
  return(
  <BrowserRouter>
  <Switch>
    <Route path="/search" render={() => {return <ResultPage queryString={queryString} setQueryString={setQueryString} colors={colors}/>}}/>
    <Route path="" render={() => {return <SearchPage queryString={queryString} setQueryString={setQueryString} colors={colors}/>}} />
  </Switch>
</BrowserRouter>
  )
}

export default App;
