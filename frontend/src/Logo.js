import React from 'react';

function Logo({ className, resetParams}) {
    const colors = ['#4285F4','#DB4437','#F4B400','#4285F4','#0F9D58', '#DB4437']
    return(
        <button className={className}
            style={{
                backgroundColor:"transparent",
                border:"none"
            }}
            onClick={() => {resetParams()}}
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