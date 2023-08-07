"use strict";

import weathercode from "../utility/weathercode.mjs";

const createTodayForecast = (data, now) => {
  // Present Temperature
  const presentTemperatureBlock = document.querySelector(
    ".today-forecast__present-temp"
  );

  const forecastHourly = data.hourly;
  const forecastPresentTimeIndex = forecastHourly.time.indexOf(now);
  const presentTemperature =
    forecastHourly.temperature_2m[forecastPresentTimeIndex];

  presentTemperatureBlock.textContent = Math.round(presentTemperature);

  // Present Weathercode
  const presentWeatherCodeBlock = document.querySelector(
    ".today-forecast__weathercode"
  );

  const presentWeatherCode =
    forecastHourly.weathercode[forecastPresentTimeIndex];

  presentWeatherCodeBlock.textContent = weathercode[presentWeatherCode];
};

export default createTodayForecast;
