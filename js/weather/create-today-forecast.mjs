"use strict";

import weathercode from "../utility/weathercode.mjs";
import weathercode_img from "../utility/weather-icons.mjs";
import createAdvanceInfoComponent from "./create-advance-info-item.mjs";
import createWeeklyItemMain from "./create-weekly-item-main.mjs";
import weeklyDateFormatter from "../user-interface/user-weekly-date-formatter.mjs";

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
  const forecastHourlyUnits = data.hourly_units;
  const forecastPresentTimeIndex = forecastHourly.time.indexOf(now);
  const forecastDaily = data.daily;

  // Maybe some complicated, but it's adding plus if temp above zero
  const presentTemperature = Math.round(
    forecastHourly.temperature_2m[forecastPresentTimeIndex]
  );

  const presentTemperatureStr = `${presentTemperature}°`;

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

  // Today forecast advanced information

  const windSpeed = forecastHourly.windspeed_10m[forecastPresentTimeIndex];
  const humiduty = forecastHourly.relativehumidity_2m[forecastPresentTimeIndex];
  const visibility = forecastHourly.visibility[forecastPresentTimeIndex];

  const advancedInfoBlock = document.querySelector(".advanced-info");

  const windSpeedInfo = createAdvanceInfoComponent(
    "Wind",
    windSpeed,
    forecastHourlyUnits.windspeed_10m,
    "/public/images/wind.svg"
  );

  const humidutyInfo = createAdvanceInfoComponent(
    "Humidity",
    humiduty,
    forecastHourlyUnits.relativehumidity_2m,
    "/public/images/humidity.svg"
  );

  const visibilityInfo = createAdvanceInfoComponent(
    "Visibility",
    Math.round(visibility / 1000),
    "km",
    "/public/images/visibility.svg"
  );

  advancedInfoBlock.innerHTML += windSpeedInfo;
  advancedInfoBlock.innerHTML += humidutyInfo;
  advancedInfoBlock.innerHTML += visibilityInfo;

  // Weekly Forecast

  const weeklyForecastBlock = document.querySelector(".weekly-forecast");

  for (let i = 1; i <= 5; i++) {
    let day = createWeeklyItemMain(
      formatTemperature(forecastDaily.temperature_2m_max[i]),
      weathercode_img[forecastDaily.weathercode[i]],
      weeklyDateFormatter(forecastDaily.time[i])
    );

    weeklyForecastBlock.innerHTML += day;
  }
};

export default createTodayForecast;
