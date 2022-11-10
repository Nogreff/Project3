import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Details from "./components/Details";

import {BrowserRouter  as Router, Routes, Route} from "react-router-dom";
import {Component} from "react";
import {DataProvider} from "./context/DataContext";
var EQData;
var EQStart,
    EQEnd,
    EQDay,
    EQTop,
    EQDetails;
var dStart = new Date();
var dEnd = new Date();
var dateI = new Date().getUTCHours()
var dateToday =new Date();
EQDay = new Date();

EQDay.setDate(dateToday.getDate()-365)
console.log(EQDay.toISOString().replace(/T.*/,'').split('-').join('-'))
EQTop = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime="+EQDay.toISOString().replace(/T.*/,'').split('-').join('-')+"&endtime="+dEnd.toISOString().replace(/T.*/,'').split('-').join('-')+"&minmagnitude=6.5"
console.log(dateI)
if(dateI>-1 && dateI<3){
  console.log("999")
  dStart.setDate(dStart.getDate()-1)
  dEnd.setDate(dEnd.getDate()+2)

}else if(dStart.getHours()>dateI){
  dStart.setDate(dStart.getDate()-1)
  dEnd.setDate(dEnd.getDate())
}else{
  dStart.setDate(dStart.getDate())
  dEnd.setDate(dEnd.getDate()+1) 
}
console.log(dateI)
/* dStart.setDate(d.getDate()-5); */
var EQWeek,EQMonth,EQYear;
console.log(dStart)
console.log(dEnd)
var EQDefault="&starttime="+dStart.toISOString().replace(/T.*/,'').split('-').join('-')+"&endtime="+dEnd.toISOString().replace(/T.*/,'').split('-').join('-')+"";
var countRequest=false
var EQUrl="https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson"+EQDefault;
console.log(EQUrl)
class App extends Component {
  state={
    quake:[],
    EQInfo:[],
    mountCheck:false
  };
  EQInfo={}
  apiRequest=()=>{
    const url=EQUrl;
    fetch(url).then(response=>response.json()).then(data=>{
      this.setState({quake: data});
      //this.state.quake=data
      console.log(data)
        EQData=this.state.quake.features;
        console.log(this.state.quake.features)
    })
  }
  
  apiInfo=()=>{
    const url=EQTop;
    fetch(url).then(response=>response.json()).then(data=>{
        this.setState({EQInfo: data.features});
        //this.state.EQInfo=data.features
        console.log(this.state.EQInfo)
    })
  }
  componentDidMount(){
    this.apiInfo();
    this.apiRequest(); 
    console.log("Component did mount")
    this.state.mountCheck=true;
  }
  searchMapDate=(Start,MinMag)=>{
    let y=Start
    console.log(Start,MinMag)
    
    console.log(y)
    EQStart="&starttime="+y+"";
    EQEnd="&endtime="+dEnd.toISOString().replace(/T.*/,'').split('-').join('-')+"&minmagnitude="+MinMag+"";
    console.log(EQStart)
    EQDefault=EQStart+EQEnd
    EQUrl="https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson"+EQDefault;
    this.apiRequest();
  }
  infoColector(){ 

        /*
        EQWeek = new Date();
        EQMonth = new Date();
        EQYear = new Date();
        switch(EQInfo.length){
          case undefined:

          case 1:

          
        }
        EQDay.setDate(dateToday.getDate()-1)*/
        //this.apiInfo("https://earthquake.usgs.gov/fdsnws/event/1/count?starttime="+EQDay.toISOString().replace(/T.*/,'').split('-').join('-')+"&endtime="+dEnd.toISOString().replace(/T.*/,'').split('-').join('-')+"")
        //EQWeek.setDate(dateToday.getDate()-7)
        //this.apiInfo("https://earthquake.usgs.gov/fdsnws/event/1/count?starttime="+EQWeek.toISOString().replace(/T.*/,'').split('-').join('-')+"&endtime="+dEnd.toISOString().replace(/T.*/,'').split('-').join('-')+"")        
        //EQMonth.setDate(dateToday.getDate()-30)
        //this.apiInfo("https://earthquake.usgs.gov/fdsnws/event/1/count?starttime="+EQMonth.toISOString().replace(/T.*/,'').split('-').join('-')+"&endtime="+dEnd.toISOString().replace(/T.*/,'').split('-').join('-')+"")
        //EQYear.setDate(dateToday.getDate()-365)
        //this.apiInfo("https://earthquake.usgs.gov/fdsnws/event/1/count?starttime="+EQYear.toISOString().replace(/T.*/,'').split('-').join('-')+"&endtime="+dEnd.toISOString().replace(/T.*/,'').split('-').join('-')+"")  
        
         
  }
  render(){
    console.log(this.state)
    return (
      <div className="App">
        <Router>
        <Header/>
        <Routes>
            <Route path="/" element={<Home EQData={this.state.quake.features} searchMapDate={this.searchMapDate} EQInfo={this.state.EQInfo} dateToday={dateToday} mountCheck={this.state.mountCheck}/>}/>
            <Route path="/Details" element={<Details/>}/>
        </Routes>
        <Footer/>
        </Router>
      </div>
    );
  }

}

export default App;
