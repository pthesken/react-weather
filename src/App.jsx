import { useState } from "react";
import "./App.css";
import Forecast from "./Forecast/Forecast";

function App() {
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState(null);
  const [zipcode, setZipcode] = useState("");

  // Function to fetch weather data based on the ZIP code
  const downloadWeather = async (zip) => {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=b1c4a77558e040c0ad644008242401&q=${zip}&days=3&aqi=no&alerts=no`
    );
    const data = await response.json();
    const forecastDays = data.forecast.forecastday;
    setLocation(data.location);
    const dailyForecasts = forecastDays.map((forecastDay) => ({
      id: forecastDay.date_epoch,
      date: forecastDay.date,
      text: forecastDay.day.condition.text,
      icon: forecastDay.day.condition.icon,
    }));
    setForecast(dailyForecasts);
    console.log(data);
  };

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    downloadWeather(zipcode); // Call the API with the entered ZIP code
  };

  // Creating a location string only when location is available
  const locationString = location
    ? `${location.name}, ${location.region}, ${location.country}`
    : "";

  return (
    <>
      <div className="app-container">
        <form onSubmit={handleSubmit} className="weather-form">
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            placeholder="Enter ZIP code"
            className="zipcode-input"
          />
          <button type="submit" className="submit-button">
            Get Weather
          </button>
        </form>
        <h1 className="location-string">{locationString}</h1>
        <div className="forecast-box">
          {forecast.map((forecast) => (
            <Forecast key={forecast.id} forecast={forecast} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
