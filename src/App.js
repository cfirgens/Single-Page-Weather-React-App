import React from 'react';
import './App.css';

import Weather from './components/weather.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';


const API_key = process.env.Weather_API_Key;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.getWeather();
  }

  getWeather = async () => {
    const api_call = await fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid='+API_key);
    
    const response = await api_call.json();

    console.log(response);
    
}


  render() { 
    return ( 
      <div className="App">
      <Weather />
      </div>
      
     );
  }
}
 
export default App;


