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

  getWeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
        case rangeId >= 500 && rangeId <= 531:
          this.setState({ icon: this.weatherIcon.Rain });
        break;
        case rangeId >= 600 && rangeId <= 622:
          this.setState({ icon: this.weatherIcon.Snow });
        break;
        case rangeId >= 701 && rangeId <= 781:
          this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
        case rangeId === 800:
          this.setState({ icon: this.weatherIcon.Clear });
        break;
        case rangeId >= 801 && rangeId <= 804:
          this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clear });

      
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
    });
    this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
  };
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


