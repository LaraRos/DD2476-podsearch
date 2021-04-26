import React from 'react';
//onClick={() => {setClickedButton(true); setSearchResult("")}}
function Logo({setClickedButton, setSearchResult, className}) {
    const colors = ['#4285F4','#DB4437','#F4B400','#4285F4','#0F9D58', '#DB4437']
    return(
        <button className={className}
            style={{
                backgroundColor:"transparent",
                border:"none"
            }}
            onClick={() => {}}
        >
            {'PodcastSearch'.split('').map((c,i) => 
            <span key={i} style={{color: colors[i%colors.length]}}>
            {c}
            </span>
            )}
        </button>
    )
}

export default Logo;