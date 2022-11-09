import {useEffect,useState} from "react"
import {useNavigate} from "react-router-dom"
import "../css/HomeInfo.css"
var EQData,infoOrder;

function HomeInfo(props){
    const {EQInfo,mountCheck}=props;
    const navigate=useNavigate();
    const[promiseInfo,setPromiseInfo]=useState("Loading ...")
    const[infoCheck,setInfoCheck]=useState(false)
    EQData=EQInfo
    console.log(mountCheck)
useEffect(()=>{
    if(mountCheck===true && EQData){
        infoOrder= EQData.sort(function(a,b){
            let c=a.properties.mag
            let d=b.properties.mag
            return d-c
    
        })
        infoOrder=infoOrder.slice(0, 5)
        setPromiseInfo(EQInfo)
        setInfoCheck(infoOrder)
        EQData=promiseInfo
    }
},[EQData,mountCheck])

if(mountCheck===true){     

}
/*     useEffect(()=>{
        if(EQInfo && infoOrder && infoCheck===false){           
            setPromiseInfo(infoOrder)
            setInfoCheck(true)
            infoOrder=promiseInfo
        }  
    }) */

    return(
        <section className="home_info">
            <div className="info_container">
             <h1>The biggest earthquakes from the last 365 days</h1>
             <ul className="info_list">
                 {
                 mountCheck===true && infoOrder?
                     infoCheck.map((value,index)=>{
                            const toDetails=()=>{
                                navigate('/Details',{
                                    state:{
                                        region:value.properties.place,
                                        date:value.properties.time,
                                        magnitude:value.properties.mag,
                                        depth:value.geometry.coordinates[2],
                                        locationX:value.geometry.coordinates[0],
                                        locationY:value.geometry.coordinates[1],
                                        USGSPage:value.properties.url 
                                    }
                            })
                            }
                            let xx=new Date(value.properties.time).toLocaleString()
                            return(
                                <li>
                                    <span>{value.properties.mag}</span> 
                                    <span className="info_date">{xx.substring(0,xx.length-3)}</span> 
                                    <span onClick={()=>{toDetails()}}><a>{value.properties.place}</a></span>
                                    {/* <span><img src={require("../img/view-details.png")}/></span> */}
                                </li>
                            )
                        })
                    :null}           
             
                </ul>
            </div>

            
        </section>   
    )
}

export default HomeInfo