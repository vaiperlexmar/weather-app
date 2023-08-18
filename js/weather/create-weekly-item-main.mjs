"use strict";

// Main means that this function create weekly forecast element for main page
function createWeeklyItemMain(maxTemperature, weathercode, date) {
  return `<div class="weekly-forecast__item">
            <p class="weekly-forecast__max-temp">${maxTemperature}</p>
            <img class="weekly-forecast__weathercode" src="/public/images/weathercodes/${weathercode}" alt="" />
            <p class="weekly-forecast__date">${date}</p>
        </div>`;
}

export default createWeeklyItemMain;
