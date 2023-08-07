"use strict";

import { dayOfTheWeek, monthNames } from "../utility/utility-date.mjs";

function userPresentDateFormatter() {
  const now = new Date();

  return `${dayOfTheWeek[now.getDay()]}, ${now.getDate()} ${
    monthNames[now.getMonth()]
  }`;
}

export default userPresentDateFormatter;
