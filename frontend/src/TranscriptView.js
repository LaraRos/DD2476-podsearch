function TranscriptView({transcript, startTime, endTime}){
    const start = parseInt((startTime).slice(0,startTime.length-1))
    const end = parseInt((endTime).slice(0,endTime.length-1))
    const startTime_m = parseInt(start/60)
    const startTime_s = parseInt(start%60)
    const endTime_m = parseInt(end/60)
    const endTime_s = parseInt(end%60)
    return <div style={{
        display: 'grid',
        gridTemplateColumns: "[first] 45vw [line2] 10vw [line2]",
        gridGap:"2vw"
        }}>
          <div>{transcript} </div>  
          <div style={{color:"blue", marginTop:"2vh"}}> {startTime_m}:{startTime_s}</div>
          <br/>
    </div>
}

export default TranscriptView;