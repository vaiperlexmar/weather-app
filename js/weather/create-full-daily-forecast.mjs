"use strict";

import weathercode from "../utility/weathercode.mjs";
import formatTemperature from "../utility/temperature-formatter.mjs";

const dailyForecastBlock = document.querySelector(".daily-forecast");

function createDailyForecastItem(time, weathercodeNumber, temperature) {
  return `
    <div class="daily-forecast__item">
      <img class="daily-forecast__weathercode" src="/public/images/weathercodes/${
        weathercode[weathercodeNumber]
      }.svg" alt="" />
      <span class="daily-forecast__temperature">${formatTemperature(
        temperature
      )}°</span>
      <span class="daily-forecast__time">${time.slice(11)}</span>
    </div>`;
}

function createFullDailyForecast(dailyForecast, now) {
  // daily forecast it's hourly object of forecast object

  const hourlyTimeArr = dailyForecast["time"];
  const hourlyWeathercodeArr = dailyForecast["weathercode"];
  const hourlyTemperatureArr = dailyForecast["temperature_2m"];

  const forecastStartTimePoint = hourlyTimeArr.indexOf(now);

  dailyForecastBlock.innerHTML = "";

  // Daily time block forecast

  for (let i = forecastStartTimePoint; i <= forecastStartTimePoint + 23; i++) {
    const dailyForecastItem = createDailyForecastItem(
      hourlyTimeArr[i],
      hourlyWeathercodeArr[i],
      hourlyTemperatureArr[i]
    );

    dailyForecastBlock.innerHTML += dailyForecastItem;
  }
}

export default createFullDailyForecast;
