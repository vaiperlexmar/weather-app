"use strict";

// Get city
const GEOCODE_URL = `https://geocode.maps.co/search?q=`;

let city = "London";
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
    forecast.then((forecastItem) => {
      console.log(forecastItem);
    });
  });

async function getForecast(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
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
