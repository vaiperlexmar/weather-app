"use strict";

const fullDailyForecastButton = document.querySelector(
  ".daily-summary__get-full"
);
const dailySummaryBlock = document.querySelector(
  ".today-forecast__daily-summary"
);
const dailySummaryHeader = document.querySelector(
  ".daily-summary__header"
).firstElementChild;
const dailyForecastBlock = document.querySelector(".daily-forecast");

function openDailyForecast() {
  dailyForecastBlock.classList.remove("slide-rotate-hor-bottom");
  dailySummaryBlock.classList.remove("slower-slide-rotate-hor-top");

  // Animation

  dailySummaryBlock.classList.add("slide-rotate-hor-bottom");
  setTimeout(() => (dailySummaryBlock.style.display = "none"), 500);
  setTimeout(() => (dailyForecastBlock.style.display = "flex"), 500);
  dailyForecastBlock.classList.add("slower-slide-rotate-hor-top");

  // Button function switch
  fullDailyForecastButton.removeEventListener("click", openDailyForecast);
  fullDailyForecastButton.addEventListener("click", closeDailyForecast);
}

function closeDailyForecast() {
  dailySummaryBlock.classList.remove("slide-rotate-hor-bottom");
  dailyForecastBlock.classList.remove("slower-slide-rotate-hor-top");

  // Animation

  dailyForecastBlock.classList.add("slide-rotate-hor-bottom");
  setTimeout(() => (dailyForecastBlock.style.display = "none"), 500);
  setTimeout(() => (dailySummaryBlock.style.display = "block"), 500);
  setTimeout(
    () => dailySummaryBlock.classList.add("slower-slide-rotate-hor-top"),
    500
  );

  // Button function switch
  fullDailyForecastButton.removeEventListener("click", closeDailyForecast);
  fullDailyForecastButton.addEventListener("click", openDailyForecast);
}

fullDailyForecastButton.addEventListener("click", openDailyForecast);
