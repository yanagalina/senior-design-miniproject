import React , { Component }  from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';





class WeatherPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lon: null,
      forecasts: null,
    };
  }

  async getWeather(lat, lon) {
    try {
      var res1 = await axios.get(`https://api.weather.gov/points/${lat},${lon}`);
      console.log(res1);
      var gridX = res1.data.properties.gridX;
      var gridY = res1.data.properties.gridY;
      var res2 = await axios.get(`https://api.weather.gov/gridpoints/TOP/${gridX},${gridY}/forecast`);
      console.log(res2.data.properties.periods[0].icon);
      this.setState({
        forecasts: res2.data.properties.periods,
      });




    }
    catch (error) {
      console.error(error);
    }
  }



  componentDidMount() {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition((position) => {
        // TODO: Save this in local storage?
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });

        this.getWeather(position.coords.latitude, position.coords.longitude);
      });
    } else {
      /* geolocation IS NOT available */
      // TODO: Handle error
      console.log("Unable to find location");
    }
  }

  render() {
    return (
    //   <div>
    //   Latitude: {this.state.lat} <br/>
    //   longitude: {this.state.lon} <br/>
    //   First forecast: {this.state.forecasts ? this.state.forecasts[0].detailedForecast : "none"}
    //   pic: {this.state.forecasts ? this.state.forecasts[0].icon : "none"}
    // </div>

<React.Fragment>

    <div>
    Latitude: {this.state.lat} <br/>
    Longitude: {this.state.lon} <br/>
    </div>

    <div>



    <br/>{this.state.forecasts ? this.state.forecasts[0].name : "none" } : {this.state.forecasts ? this.state.forecasts[0].shortForecast : "none"} <br/>
      <img src ={this.state.forecasts ? this.state.forecasts[0].icon : "none" }/> <br/>
    Temp: {this.state.forecasts ? this.state.forecasts[0].temperature : "none"} {this.state.forecasts ? this.state.forecasts[0].temperatureUnit : "none"} <br/>
    </div>

    <div>
    <br/> {this.state.forecasts ? this.state.forecasts[1].name : "none" } : {this.state.forecasts ? this.state.forecasts[1].shortForecast : "none"} <br/>
    <img src ={this.state.forecasts ? this.state.forecasts[1].icon : "none" }/> <br/>
    Temp: {this.state.forecasts ? this.state.forecasts[1].temperature : "none"} {this.state.forecasts ? this.state.forecasts[1].temperatureUnit : "none"} <br/>
    </div>

    <div>
    <br/> {this.state.forecasts ? this.state.forecasts[2].name : "none" } : {this.state.forecasts ? this.state.forecasts[2].shortForecast : "none"} <br/>
    <img src ={this.state.forecasts ? this.state.forecasts[2].icon : "none" }/> <br/>
    Temp: {this.state.forecasts ? this.state.forecasts[2].temperature : "none"} {this.state.forecasts ? this.state.forecasts[2].temperatureUnit : "none"} <br/>
    </div>

    <div>
    <br/> {this.state.forecasts ? this.state.forecasts[3].name : "none" } : {this.state.forecasts ? this.state.forecasts[3].shortForecast : "none"} <br/>
    <img src ={this.state.forecasts ? this.state.forecasts[3].icon : "none" }/> <br/>
    Temp: {this.state.forecasts ? this.state.forecasts[3].temperature : "none"} {this.state.forecasts ? this.state.forecasts[3].temperatureUnit : "none"} <br/>
    </div>

    <div>
    <br/> {this.state.forecasts ? this.state.forecasts[4].name : "none" } : {this.state.forecasts ? this.state.forecasts[4].shortForecast : "none"} <br/>
    <img src ={this.state.forecasts ? this.state.forecasts[4].icon : "none" }/> <br/>
    Temp: {this.state.forecasts ? this.state.forecasts[4].temperature : "none"} {this.state.forecasts ? this.state.forecasts[4].temperatureUnit : "none"} <br/>
    </div>
    <div>
    <br/> {this.state.forecasts ? this.state.forecasts[5].name : "none" } : {this.state.forecasts ? this.state.forecasts[5].shortForecast : "none"} <br/>
    <img src ={this.state.forecasts ? this.state.forecasts[5].icon : "none" }/> <br/>
    Temp: {this.state.forecasts ? this.state.forecasts[5].temperature : "none"} {this.state.forecasts ? this.state.forecasts[5].temperatureUnit : "none"} <br/>
    </div>

    <div>
    <br/> {this.state.forecasts ? this.state.forecasts[6].name : "none" } : {this.state.forecasts ? this.state.forecasts[6].shortForecast : "none"} <br/>
    <img src ={this.state.forecasts ? this.state.forecasts[6].icon : "none" }/> <br/>
    Temp: {this.state.forecasts ? this.state.forecasts[6].temperature : "none"} {this.state.forecasts ? this.state.forecasts[6].temperatureUnit : "none"} <br/>
    </div>

    <div>
    <br/> {this.state.forecasts ? this.state.forecasts[7].name : "none" } : {this.state.forecasts ? this.state.forecasts[7].shortForecast : "none"} <br/>
    <img src ={this.state.forecasts ? this.state.forecasts[7].icon : "none" }/> <br/>
    Temp: {this.state.forecasts ? this.state.forecasts[7].temperature : "none"} {this.state.forecasts ? this.state.forecasts[7].temperatureUnit : "none"} <br/>
    </div>
    </React.Fragment>
    )
  }

}



export default WeatherPanel;
