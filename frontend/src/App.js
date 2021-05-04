import React , {useState}from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ResultPage from './ResultPage.js'
import SearchPage from './SearchPage.js'
import EpisodePage from './EpisodePage.js'

function App() {
  const [queryString, setQueryString] = useState("")
  const [searchResult, setSearchResult] = useState("")
  const [episodeResults, setEpisodeResults] = useState("");
  const [searchType, setSearchType] = useState("intersection")
  const [podcastName, setPodcastName] = useState("")

  const resetParams = function(){
    setQueryString("")
    setSearchResult("")
    //setClickedButton(false)
    setEpisodeResults("")
    setSearchType("intersection")
    setPodcastName("")
  }
  return(
  <BrowserRouter>
    <Switch>
      <Route path="/episode" render={() => {return <EpisodePage queryString={queryString} podcastName={podcastName} episodeResults={episodeResults} setEpisodeResults={setEpisodeResults} resetParams={resetParams}/>}}/>
      <Route path="/search" render={() => {return <ResultPage podcastName={podcastName} setPodcastName={setPodcastName} searchType={searchType} setSearchType={setSearchType} queryString={queryString} setQueryString={setQueryString} searchResult={searchResult} setSearchResult={setSearchResult} resetParams={resetParams}/>}}/>
      <Route path="/" render={() => {return <SearchPage podcastName={podcastName} setPodcastName={setPodcastName} searchType={searchType} setSearchType={setSearchType} queryString={queryString} setQueryString={setQueryString} searchResult={searchResult} setSearchResult={setSearchResult}/>}} />
    </Switch>
  </BrowserRouter>
  )
}

export default App;
