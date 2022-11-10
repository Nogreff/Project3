import LatestCard from "./LatestCard";
import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom"
import "../css/HomeLatest.css"

function HomeLatest(props){
    const {EQData}= props;
    const [EQLatest,setEQLatest] =useState([]);
    const [latestCheck,setLatestCheck]=useState(false)
    const navigate=useNavigate()
    var latestEQ;
    if(EQData){ 
/*         var latestSort=EQData.slice().sort(function(a,b){
            var c=Number(a.properties.time)
            var d=Number(b.properties.time)         
            return d-c

       }) */
        latestEQ=EQData.slice(0,10);            
        if(latestCheck===false && (latestEQ && EQData)){           
            latestEQ=EQData.slice(0,10)
            setEQLatest(latestEQ);
            setLatestCheck(true)
        }
        latestEQ=EQLatest;

        
    }
/*     useEffect(()=>{
        if(EQData){

        }
    },[EQData]) */
    console.log(EQData)
    return(
        <section className="home_latest">
            <div className="latest_wrap">
            <h1>Latest earthquakes</h1>
            <ul className="latest_description">
                <li>Date & time</li>
                <li>Depth</li>
                <li>Magnitude</li>
                <li>Region name</li>
            </ul>
           <ul className="latest_detail">
            {
               EQData && latestEQ?
               latestEQ.map((item,index)=>{
                    var timeUTC=new Date(item.properties.time)
                    timeUTC=timeUTC.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' , hour12: false});
                    var latestUTC=new Date(item.properties.updated)
                    latestUTC=latestUTC.toLocaleString('EN-us');
                    const toDetails=()=>{
                        navigate("/Details",{
                            state:{
                                region:item.properties.place,
                                date:item.properties.time,
                                magnitude:item.properties.mag,
                                depth:item.geometry.coordinates[2],
                                locationX:item.geometry.coordinates[0],
                                locationY:item.geometry.coordinates[1],
                                USGSPage:item.properties.url
                            }
                        })
                    }
                    return(
                        <li>
                            <span>{timeUTC}</span>
                            <span>{String(item.geometry.coordinates[2]).slice(0,5)} km</span>
                            <span>{String(item.properties.mag).slice(0,5)} md</span>
                            <span onClick={()=>{toDetails()}}><a>{item.properties.place}</a></span>
                        </li>
                    )
                })
                :null
            }
            
           </ul>
            </div>

        </section>
    )
}

export default HomeLatest