import React , {useState}from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ResultPage from './ResultPage.js'
import SearchPage from './SearchPage.js'
import EpisodePage from './EpisodePage.js'

function App() {
  const [queryString, setQueryString] = useState("")
  const [searchResult, setSearchResult] = useState("")
  const [clickedButton, setClickedButton] = useState(false)
  return(
  <BrowserRouter>
    <Switch>
      <Route path="/episode" render={() => {return <EpisodePage clickedButton={clickedButton} setClickedButton={setClickedButton} queryString={queryString} setQueryString={setQueryString} searchResult={searchResult} setSearchResult={setSearchResult}/>}}/>
      <Route path="/search" render={() => {return <ResultPage clickedButton={clickedButton} setClickedButton={setClickedButton} queryString={queryString} setQueryString={setQueryString} searchResult={searchResult} setSearchResult={setSearchResult}/>}}/>
      <Route path="" render={() => {return <SearchPage clickedButton={clickedButton} setClickedButton={setClickedButton} queryString={queryString} setQueryString={setQueryString} searchResult={searchResult} setSearchResult={setSearchResult}/>}} />
    </Switch>
  </BrowserRouter>
  )
}

export default App;
