import { useState } from "react";
import "./App.css";
import Forecast from "./Forecast/Forecast";


function App() {
  const [forecast, setForecast] = useState([]);
  useState(() => {
    const downloadWeather = async () => {
      const response = await fetch(
        "http://api.weatherapi.com/v1/forecast.json?key=b1c4a77558e040c0ad644008242401&q=96756&days=3&aqi=no&alerts=no"
      );
      const data = await response.json();
      const forecastDays = data.forecast.forecastday;
      console.log(data);
      const dailyForecasts = forecastDays.map((forecastDay) => ({
        id: forecastDay.date_epoch,
        date: forecastDay.date,
        text: forecastDay.day.condition.text,
        icon: forecastDay.day.condition.icon,
      }));
      setForecast(dailyForecasts);
    };
    downloadWeather();
  }, []);
  return (
    <>
      <div className="forecast-box">
        {forecast.map((forecast, index) => (
          <Forecast key={forecast.id} forecast={forecast} />
        ))}
      </div>
    </>
  );
}

export default App;
