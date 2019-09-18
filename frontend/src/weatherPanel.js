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
      location: null,
    };
  }

  async getWeather(lat, lon) {
    try {
      var res1 = await axios.get(`https://api.weather.gov/points/${lat},${lon}`);
      console.log(res1);
      var gridX = res1.data.properties.gridX;
      var gridY = res1.data.properties.gridY;
      var res2 = await axios.get(`https://api.weather.gov/gridpoints/TOP/${gridX},${gridY}/forecast`);
      console.log(res2.data);
      this.setState({
        location: res1.data.properties.relativeLocation.properties.city + ", " + res1.data.properties.relativeLocation.properties.state,
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
    if (this.state.forecasts === null) {
      return ("Loading...")
    }
    return (


<React.Fragment>

    <div>
    Location: {this.state.location} <br/>
    </div>

    {this.state.forecasts && this.state.forecasts.map((forecast) => {
      return(
        <div>
          <br/>
          {forecast.name} : {forecast.shortForecast} <br/>
          <img src={forecast.icon}/> <br/>
          Temp: {forecast.temperature} °{forecast.temperatureUnit} <br/>
        </div>
      );
    })}

</React.Fragment>
    )
  }

}



export default WeatherPanel;
