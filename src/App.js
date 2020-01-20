import React from 'react';
import './App.css';

import Weather from './components/weather.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';


const API_key = "ca76c48131e90a9e8c4a1124919229bc"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      temp_max: undefined,
      temp_min: undefined,
      fahrenheit: undefined,
      description: "",
      error:false
    }
    this.getWeather();

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
  }

  getWeather = async () => {
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}`);
    
    const response = await api_call.json();

    console.log(response);

    this.setState({
      city: response.name,
      country: response.sys.country,
      fahrenheit: this.calFahrenheit(response.main.temp),
      temp_max: this.calFahrenheit(response.main.temp_max),
      temp_min: this.calFahrenheit(response.main.temp_min),
      description: response.weather[0].description,
      icon:this.weatherIcon.Thunderstorm,
    });
    
}
calFahrenheit(temp){
  let fahrenheit = Math.floor((temp - 273.15)*(9/5)+32);
  return fahrenheit;
}

  render() { 
    return ( 
      <div className="App">
        <Weather city={this.state.city} country={this.state.country} temp_fahrenheit={this.state.fahrenheit} temp_max={this.state.temp_max} temp_min={this.state.temp_min} description={this.state.description}
          weatherIcon={this.state.icon}/>
      </div>
      
     );
  }
}
 
export default App;


