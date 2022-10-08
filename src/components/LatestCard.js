function LatestCard(props){
    const{time,Latitude,Longitude,Depth,Magnitude,RegName,lastUpdate}=props;
    var timeUTC=new Date(time)
    timeUTC=timeUTC.toLocaleString();
    var latestUTC=new Date(lastUpdate)
    latestUTC=latestUTC.toLocaleString();
    return(
        <>
            <li>
                <span>{timeUTC}</span>
                <span>{Latitude}</span>
                <span>{Longitude}</span>
                <span>{Depth}</span>
                <span>{Magnitude}</span>
                <span>{RegName}</span>
                <span>{latestUTC}</span>
            </li>
        </>
    )
}

export default LatestCard