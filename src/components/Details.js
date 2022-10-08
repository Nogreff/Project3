import {useLocation, useNavigate} from "react-router-dom"
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, CircleMarker,Popup, Marker ,LayerGroup,Circle} from 'react-leaflet'
import "../css/Details.css"
function Details(props){
    const {searchDetails,EQDetails}=props
    const navigate=useNavigate();
    const location=useLocation();
    var currentDate =new Date().toLocaleString('EN-us');
    var UTCDate=new Date(location.state.date)
    const redOptions = { color: 'red' , fillColor: 'green' }
    const position = [location.state.locationY,location.state.locationX]
// request a weekday along with a long date
var options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12:false, timeZone:'UTC'
  };
   
    console.log(new Date(location.state.date))
    console.log(UTCDate)
    var xxx = new Intl.DateTimeFormat('en-EN', options).format((location.state.date))
    console.log(xxx)
    return(
        <section className="details">
            <div className="details_info">
                <h1>{location.state.magnitude} magnitude earthquake, {location.state.region}</h1>
                
                <ul className="details_list">
                    
                    <li><strong>UTC Time:</strong>{xxx.substring(0,xxx.length -3)}</li>
                    <li><strong>Your Time:</strong>{currentDate.substring(0,currentDate.length -6)}</li>
                    <li><strong>Depth:</strong>{location.state.depth}</li>
                    <li><strong>Coordinates:</strong>{location.state.locationX}, {location.state.locationY}</li>
                    <li className="list_link"><strong>More details:</strong><a href={location.state.USGSPage} target="_blank">See more</a></li>
                    
                </ul>
                <a className="button_stnd" onClick={()=>{navigate("/")}}>
                Go back
            </a>
            </div>
            <div className="details_map">
            <MapContainer center={position} zoom={9} scrollWheelZoom={false}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

{                          <CircleMarker center={[location.state.locationY,location.state.locationX]} pathOptions={redOptions} radius={location.state.magnitude  * 15} >
                          <Popup>
                            
                              <h5>{location.state.region}</h5>
                              <p>Magnitud: {location.state.magnitude}</p>
                            
                          </Popup>
                        </CircleMarker> }
                        <LayerGroup>
          <Circle
            center={position}
            pathOptions={{ fillColor: 'blue' }}
            radius={location.state.magnitude  * 10}
          />
          <Circle
            center={position}
            pathOptions={{ fillColor: 'red' }}
            radius={location.state.magnitude  * 5}
            stroke={false}
          />
          </LayerGroup>
                </MapContainer>
            </div>
        </section>
    )
}

export default Details