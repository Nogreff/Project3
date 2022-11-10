import {useEffect,useState} from "react"
import {useNavigate} from "react-router-dom"
import "../css/HomeInfo.css"
var EQData,infoOrder;

function HomeInfo(props){
    const {EQInfo,mountCheck}=props;
    const navigate=useNavigate();
    const[promiseInfo,setPromiseInfo]=useState("Loading ...")
    const[infoCheck,setInfoCheck]=useState(false)
    //EQData=EQInfo
    console.log(mountCheck)
    console.log(EQInfo)
useEffect(()=>{
    if(EQInfo && mountCheck===true){
        infoOrder= EQInfo.sort(function(a,b){
            let c=a.properties.mag
            let d=b.properties.mag
            return d-c
    
        })
        console.log(infoOrder)
        infoOrder=infoOrder.slice(0, 5)
        setPromiseInfo(EQInfo)
        setInfoCheck(infoOrder)
        EQData=promiseInfo
        console.log("filtering")
    }
},[EQInfo,mountCheck])

if(mountCheck===true){     

}
/*     useEffect(()=>{
        if(EQInfo && infoOrder && infoCheck===false){           
            setPromiseInfo(infoOrder)
            setInfoCheck(true)
            infoOrder=promiseInfo
        }  
    }) */
console.log("infoOrder :"+infoOrder)
    return(
        <section className="home_info">
            <div className="info_container">
             <h1>The biggest earthquakes from the last 365 days</h1>
             <ul className="info_list">
                 {
                infoOrder && infoOrder.length>0?
                     infoOrder.map((value,index)=>{
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
                            let xx=new Date(value.properties.time).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' , hour12: false})
                            return(
                                <li>
                                    <span>{value.properties.mag}</span> 
                                    <span className="info_date">{xx}</span> 
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