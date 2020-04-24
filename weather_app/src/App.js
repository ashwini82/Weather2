import React from "react";
import moment from "moment";
/*import "moment-timezone";
import tz from "zipcode-to-timezone";*/
import "./App.css";
/* 5e0cd4889c06f9c4861fbd431372378f
https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}*/

class App extends React.Component {
  state = {};

  /*  getTime = () => {
      const zone = tz.lookup(this.state.zip);
      const now = Moment().tz(zone).format("dddd, MMMM Do YYYY, h:mm a");
  
      this.setState({
        time: now,
      });
    };
  
    const time = moment()
        .utcOffset(this.state.timezone / 60)
        .format("llll");
      let time = moment().format("llll");
   
      this.setState({
        time: time,
      });
   
    };*/
  getTime = () => {
    let time = moment().format("llll");
    this.setState({
      time: time,
    });
  };
  getWeather = () => {
    let inputValue = document.getElementById("zipInput").value;
    /* fetch("https://api.openweathermap.org/data/2.5/weather?zip=" + zipInput + ",us&appid=" +
       process.env.REACT_APP_OW_API_KEY)*/
    fetch("https://api.openweathermap.org/data/2.5/weather?zip=" + inputValue + ",us&units=imperial&appid=5e0cd4889c06f9c4861fbd431372378f")

      .then((response) => {
        if (response.status !== 200) {
          console.log(
            "There is some problem.Status Code: " + response.status)
          return;
        }

        response.json().then((data) => {
          console.log(data);

          this.setState({

            temperature: data.main.temp,
            tempmax: data.main.temp_max,
            tempmin: data.main.temp_min,
            city: data.name,
            description: data.weather[0].description,
            Country: data.sys.country,
            //   timezone: data.timezone,
          });

          this.getTime();
        });
      }
      )
      .catch((error) => {
        console.log("Error");
      });
  };

  render() {
    return (
      <div className="container">

        <div className="display-1 ">
          <h1 className="App-header">Weather App</h1>
        </div>
        <div className="display">
          <input type="text" id="zipInput" placeholder="Enter"></input>
          <button className="btn" onClick={this.getWeather}>Search</button>
        </div >
        <div className="display">
          <p>{this.state.city}   {this.state.Country}</p>
          <p>{this.state.temperature} </p>
          <p>{this.state.tempmax}   {this.state.tempmin}</p>
          <p>{this.state.description}</p>
          <p>{this.state.time}</p>

        </div>
      </div >
    )
  }
}

export default App;
