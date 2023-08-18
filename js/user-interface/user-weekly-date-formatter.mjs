"use strict";

import { monthNames } from "../utility/utility-date.mjs";

function weeklyDateFormatter(date) {
  let day = date.slice(8);
  let month = date.slice(5, 7).replace(/^0+/, "");
  return `${day} ${monthNames[month - 1].slice(0, 3)}`;
}

export default weeklyDateFormatter;
