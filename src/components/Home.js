import HomeInfo from "./HomeInfo";
import HomeMap from "./HomeMap";
import HomeLatest from "./HomeLatest";
import "../css/Home.css"
function Home(props){
    const {EQData, searchMapDate,EQInfo,dateToday,mountCheck}=props;
    return(
        <div className="home_container"> 
            <HomeInfo EQInfo={EQInfo} mountCheck={mountCheck}/> 
            <HomeMap EQData={EQData} searchMapDate={searchMapDate} dateToday={dateToday}/>
            <HomeLatest EQData={EQData} />             
        </div>
    )
}

export default Home