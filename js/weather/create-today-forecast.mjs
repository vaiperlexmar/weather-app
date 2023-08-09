"use strict";

import weathercode from "../utility/weathercode.mjs";

const createTodayForecast = (data, now) => {
  // Temperature formatter

  function formatTemperature(temperature) {
    const roundedTemperature = Math.round(temperature);
    return roundedTemperature > 0
      ? `+${roundedTemperature}`
      : `${roundedTemperature}`;
  }

  // Present Temperature
  const presentTemperatureBlock = document.querySelector(
    ".today-forecast__present-temp"
  );

  const forecastHourly = data.hourly;
  const forecastPresentTimeIndex = forecastHourly.time.indexOf(now);
  const forecastDaily = data.daily;

  // Maybe some complicated, but it's adding plus if temp above zero
  const presentTemperature = Math.round(
    forecastHourly.temperature_2m[forecastPresentTimeIndex]
  );

  const presentTemperatureStr = formatTemperature(presentTemperature);

  presentTemperatureBlock.textContent = presentTemperatureStr;

  // Apparent temperature
  const apparentTemperature = Math.round(
    forecastHourly.apparent_temperature[forecastPresentTimeIndex]
  );

  const apparentTemperatureStr = formatTemperature(apparentTemperature);

  // Present Weathercode
  const presentWeatherCodeBlock = document.querySelector(
    ".today-forecast__weathercode"
  );

  const presentWeatherCode =
    forecastHourly.weathercode[forecastPresentTimeIndex];

  presentWeatherCodeBlock.textContent = weathercode[presentWeatherCode];

  // Humidity
  const humidity = forecastHourly.relativehumidity_2m[forecastPresentTimeIndex];

  // Daily Summary Block
  const dailySummaryBlock = document.querySelector(
    ".today-forecast__daily-summary"
  );
  const dailySummaryBlock_feelsLike = document.createElement("p");

  if (apparentTemperature > presentTemperature) {
    dailySummaryBlock_feelsLike.textContent = `Now it feels like ${apparentTemperatureStr}', actually ${presentTemperatureStr}'.`;
  } else if (apparentTemperature < presentTemperature) {
    dailySummaryBlock_feelsLike.textContent = `Now it seems that ${apparentTemperature}', in fact ${presentTemperatureStr}.'`;
  } else if (apparentTemperature === presentTemperature) {
    dailySummaryBlock_feelsLike.textContent = `Now it feels like you can trust temperature value above.`;
  }

  dailySummaryBlock.append(dailySummaryBlock_feelsLike);

  // Paragraph for general weather descripton and temp range

  const dailySummaryBlock_extraDescription = document.createElement("p");

  if (
    (weathercode[presentWeatherCode] === "Sunny" ||
      weathercode[presentWeatherCode] === "Mainly clear") &&
    apparentTemperature >= 20
  ) {
    dailySummaryBlock_extraDescription.textContent =
      "It feels hot because of the direct sun.";
  } else if (
    weathercode[presentWeatherCode].includes("drizzle") ||
    weathercode[presentWeatherCode].includes("rain")
  ) {
    dailySummaryBlock_extraDescription.textContent = `It feels humiduty because of the ${weathercode}.`;
  }

  // Today temperature range

  const todayMinTemperature = Math.round(forecastDaily.temperature_2m_min[0]);
  const todayMaxTemperature = Math.round(forecastDaily.temperature_2m_max[0]);

  const todayMinTemperatureStr = formatTemperature(todayMinTemperature);
  const todayMaxTemperatureStr = formatTemperature(todayMaxTemperature);

  dailySummaryBlock_extraDescription.innerText += `Today, the temperature is felt in the range from ${todayMinTemperatureStr} to ${todayMaxTemperatureStr}`;
  dailySummaryBlock.append(dailySummaryBlock_extraDescription);
};

export default createTodayForecast;
