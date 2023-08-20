"use strict";

const HUMIDITY_SVG = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path style="color:white" d="M480-100q-133 0-226.5-91.709T160-415q0-63.142 24.5-120.771Q209-593.401 254-637.5L480-860l226 222.5q45 44.099 69.5 101.729Q800-478.142 800-415q0 131.582-93.5 223.291T480-100Zm-.235-60Q588-160 664-234.067q76-74.067 76-181.113Q740-466 720.5-512 701-558 666-593L480-776 294-593q-35 35-54.5 80.996-19.5 45.995-19.5 96.861Q220-308 295.765-234q75.764 74 184 74Z"/></svg>`;

function createAdvanceInfoComponent(name, value, value_units, iconSrc) {
  return `<div class="advanced-info__item">
        <img class="advanced-info__img" src="${iconSrc}" />
        <p class="advanced-info__value">${value} ${value_units}</p>
        <p class="advanced-info__name">${name}</p>
    </div>`;
}

export default createAdvanceInfoComponent;
