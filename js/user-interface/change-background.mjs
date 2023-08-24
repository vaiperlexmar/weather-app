"use strict";

const MORNING_COLOR = "#42C6FF";
const DAY_COLOR = "#FFE142";
const EVENING_COLOR = "#FF64D4";

const rootEl = document.querySelector(":root");
const presentTime = new Date();

function dayTimeColorChanging() {
  if (0 <= presentTime.getHours() && presentTime.getHours() < 6) {
    rootEl.style.setProperty("--primary-color", `${EVENING_COLOR}`);
  } else if (6 <= presentTime.getHours() && presentTime.getHours() < 12) {
    rootEl.style.setProperty("--primary-color", `${MORNING_COLOR}`);
  } else if (12 <= presentTime.getHours() && presentTime.getHours() < 18) {
    rootEl.style.setProperty("--primary-color", `${DAY_COLOR}`);
  } else if (18 <= presentTime.getHours() && presentTime.getHours() <= 23) {
    rootEl.style.setProperty("--primary-color", `${EVENING_COLOR}`);
  }
}

dayTimeColorChanging();
