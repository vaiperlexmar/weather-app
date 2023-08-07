"use strict";

import nowDateFormatter from "./user-interface/now-date-formatter.mjs";
import createTodayForecast from "./weather/create-today-forecast.mjs";
import userPresentDateFormatter from "./user-interface/user-present-date-formatter.mjs";

// Get city
const GEOCODE_URL = `https://geocode.maps.co/search?q=`;
const headers = ["tempe"];

let city = "Tambov";
let cityCoordinates;

async function fetchCoordinates() {
  try {
    const response = await fetch(`${GEOCODE_URL}${city}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
}

// Get a forecast

const promise = fetchCoordinates();
promise
  .then((data) => {
    for (let item of data) {
      if (item.class === "boundary") {
        cityCoordinates = item;
        return cityCoordinates;
      }
    }
  })
  .then((cityCoordinates) => {
    const forecast = getForecast(cityCoordinates.lat, cityCoordinates.lon);
    return forecast;
  })
  .then((forecastItem) => {
    const now = nowDateFormatter(new Date());
    createTodayForecast(forecastItem, now);
    console.log(forecastItem);
  });

async function getForecast(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
}

// Interface info

const todayForecastBlock = document.querySelector(".today-forecast");
const cityNameBlock = document.querySelector("#city-name");
const presentDateBlock = document.querySelector(".today-forecast__date");

cityNameBlock.textContent = city;
presentDateBlock.textContent = userPresentDateFormatter();
