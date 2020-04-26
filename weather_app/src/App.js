import React from "react";
import moment from "moment";
import "./App.css";

/* 5e0cd4889c06f9c4861fbd431372378f
https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}*/
class App extends React.Component {
  state = {};

  getWeather = () => {
    let inputValue = document.getElementById("zipInput").value;
    /*   fetch("https://api.openweathermap.org/data/2.5/weather?zip=" + inputValue + ",us&appid=" +
         process.env.REACT_APP_OW_API_KEY)*/
    fetch("https://api.openweathermap.org/data/2.5/weather?zip=" + inputValue +
      ",us&units=metric&appid=5e0cd4889c06f9c4861fbd431372378f")

      .then((response) => {
        if (response.status !== 200) {
          console.log(
            "There is some problem.Status Code: " + response.status)
          return;
        }

        response.json().then((data) => {
          console.log(data);

          this.setState({

            time: moment().utcOffset(data.timezone / 60 / 60)
              .format('llll'),

            temperature: Math.round(data.main.temp) + "°C",
            wind: data.wind.speed,
            humidity: data.main.humidity,
            city: data.name,
            description: data.weather[0].description,
            Country: data.sys.country,
            icon: data.weather[0].icon,
          });
        });
      }
      )
      .catch((error) => {
        console.log("Error");
      });
  };

  render() {

    return (

      <div className="container-md">

        <div>
          <h1 className="App-header">Current Weather</h1>
        </div>
        <div className="display1 text-center p-2">
          <input className="inp" type="text" id="zipInput" placeholder="Enter Zip Here"></input>
          <button className="button" onClick={this.getWeather}>Search</button>
        </div >
        <div className="display text-center ">
          <p id="city">{this.state.city}
            {this.state.Country}
          </p>
          <p>{this.state.time}</p>

          <p>Temp:
            <span className="tmp">
              {this.state.temperature}
            </span> </p>

          <p id="des">Description:{this.state.description}</p>
          <div>
            <p>Humidity : {this.state.humidity}</p>
          </div>
          <div>
            <p>Wind speed : {this.state.wind}</p>
          </div>
          <img
            src={`http://openweathermap.org/img/w/${this.state.icon}.png`}
            alt=""
          ></img>

        </div>

      </div>
    )
  };
}

export default App;
