"use strict";

function formatTemperature(temperature) {
  const roundedTemperature = Math.round(temperature);
  return roundedTemperature > 0
    ? `+${roundedTemperature}`
    : roundedTemperature < 0
    ? `-${roundedTemperature}`
    : undefined;
}

export default formatTemperature;
