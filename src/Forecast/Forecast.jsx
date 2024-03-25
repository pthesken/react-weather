import React from "react";
import "./Forecast.css";

export default function Forecast({ forecast }) {
  return (
    <div className="forecast-item">
      <div className="forecast-item-contents">
        <h1>{forecast.date}</h1>
        <h2>{forecast.text}</h2>
        <img src={forecast.icon} alt={forecast.text} />
      </div>
    </div>
  );
}
