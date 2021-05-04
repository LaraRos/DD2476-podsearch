import React from 'react';
import  { Redirect } from 'react-router-dom'
import Logo from './Logo.js'
import SearchField from './SearchField'

function SearchPage({searchType, setSearchType,queryString, setQueryString, searchResult, setSearchResult}) {
    return (
        searchResult !== "" ? <Redirect to={String('/search')} /> : 
        <div className="App">
            <div className="header">
                <Logo className="header" resetParams={()=>{}}/>
            </div>
                <SearchField setSearchType={setSearchType} searchType={searchType} queryString={queryString} setQueryString={setQueryString} setSearchResult={setSearchResult}/>
            <div className="infobox" type='text'>
                Information for Podcast searchers!
                <br/>Search for any content that you wish to find in a Podcast. We will
                find the best possible match for you.
            </div>
        </div>
    );
}


export default SearchPage;