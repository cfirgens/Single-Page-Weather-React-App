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
      country: undefined
    }
    this.getWeather();
  }

  getWeather = async () => {
    const api_call = await fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid='+API_key);
    
    const response = await api_call.json();

    console.log(response);
    this.setState({
      city: response.name,
      country: response.sys.country
    });
    
}


  render() { 
    return ( 
      <div className="App">
        <Weather city={this.state.city} country={this.state.country} />
      </div>
      
     );
  }
}
 
export default App;


