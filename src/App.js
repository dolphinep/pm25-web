import React from "react";
import "./App.css";
import Form from "./app_component/form.component";
import Weather from "./app_component/weather.component";
import PMButton from "./app_component/pm25.component";
import PMDetail from "./app_component/pm25detail.component";
import "bootstrap/dist/css/bootstrap.min.css";

// git project https://github.com/erikflowers/weather-icons
import "weather-icons/css/weather-icons.css";

const Api_Key = "429736441cf3572838aa10530929f7cd";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      error: false,
      predictions: [],
      isLoaded: false,
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  getWeather = async (e) => {
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if (country && city) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
      );

      const response = await api_call.json();

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        main: response.weather[0].main,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false,
      });

      // seting icons
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

      console.log(response);
    } else {
      this.setState({
        error: true,
      });
    }
  };

  getPM25 = async (e) => {
    e.preventDefault();

    const rawResponse = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: "Thailand",
        city: "Bangkok",
      }),
    });
    const content = await rawResponse.json();
    this.setState({
      predictions: content.prediction,
      isLoaded: true,
    });
    console.log(this.state.predictions.slice(24, 48));
  };

  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather
          cityname={this.state.city}
          weatherIcon={this.state.icon}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
        />
        <PMButton loadPM25={this.getPM25} error={this.state.error} />
        <PMDetail
          day1={this.state.predictions.slice(0, 24)}
          day2={this.state.predictions.slice(24, 48)}
          day3={this.state.predictions.slice(48, 72)}
          isLoaded={this.state.isLoaded}
        />
      </div>
    );
  }
}

export default App;
