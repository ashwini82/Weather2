import React from "react"
import './App.css';

/* 5e0cd4889c06f9c4861fbd431372378f
https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}*/

class App extends React.Component {
  state = {


  }

  getWeather = () => {
    const zipInput = document.getElementById("zipinput").value;
    /*  fetch("https://api.openweathermap.org/data/2.5/weather?zip=" + zipInput + ",us&appid=" + process.env.REACT_APP_OW_API_KEY)*/
    fetch("https://api.openweathermap.org/data/2.5/weather?zip=" + zipInput + ",us&appid=5e0cd4889c06f9c4861fbd431372378f")

      .then((response) => {
        if (response.status !== 200) {
          console.log(
            "There is some problem.Status Code: " + response.status)
          return;
        }
        response.json().then((data) => {
          console.log(data);

          this.setState({
            zip: zipInput,
            temperature: data.main.temp,
            city: data.name
          })

        })
          .catch((error) => {
            console.log("Error");
          });
      }
      )
  }

  render() {
    return (
      <div>
        <div>
          <input type="text" id="zipinput" placeholder="Enter"></input>
          <button onClick={this.getWeather}>Search</button>
        </div >
        <div>
          <p>{this.state.city}</p>
          <p>{this.state.temperature}</p>
        </div>
      </div>


    )
  }
}

export default App;
