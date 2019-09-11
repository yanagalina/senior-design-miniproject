import React , { Component }  from 'react';
import axios from 'axios';


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
      console.log(res2);
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
      <div>
      Latitude: {this.state.lat} <br/>
      longitude: {this.state.lon} <br/>
      First forecast: {this.state.forecasts ? this.state.forecasts[0].detailedForecast : "none"}
      </div>
    )
  }

}



export default WeatherPanel;

