"use strict";

function nowDateFormatter(date) {
  //   Offset the time diffrence
  const offset = new Date().getTimezoneOffset() * 60000;
  const offsetedNowDate = new Date(Date.now() - offset);
  offsetedNowDate.setMinutes(0);

  return offsetedNowDate.toISOString().slice(0, 16);
}

export default nowDateFormatter;
