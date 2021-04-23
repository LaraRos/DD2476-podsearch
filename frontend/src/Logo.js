import React from 'react';

function ResultPage() {
    const colors = ['#4285F4','#DB4437','#F4B400','#4285F4','#0F9D58', '#DB4437']
    return(
        <div>
            {'PodcastSearch'.split('').map((c,i) => 
            <span style={{color: colors[i%colors.length]}}>
            {c}
            </span>
            )}
        </div>
    )
}

export default ResultPage;