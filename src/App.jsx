import { useState } from "react";
import "./App.css";

function App() {
  const [forecast, setForecast] = useState([]);
  useState(() => {
    const downloadWeather = async () => {
      const response = await fetch(
        "http://api.weatherapi.com/v1/forecast.json?key=b1c4a77558e040c0ad644008242401&q=96756&days=3&aqi=no&alerts=no"
      );
      const data = await response.json();
      console.log(data);
      const dailyForecast = data.forecast.forecastday.map((dog) => ({
        date: dog.date,
        text: dog.day.condition.text,
        icon: dog.day.condition.icon,
      }));
      setForecast(dailyForecast);
    };
    downloadWeather();
  }, []);
  return (
    <>
      <div className="forecast-box">
        {forecast.map((forecast, index) => (
          <div key={index} className="forecast-item">
            <div className="forecast-item-contents">
              <h1>{forecast.date}</h1>
              <h2>{forecast.text}</h2>
              <img src={forecast.icon} alt={forecast.text} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
