"use strict";

function createAdvanceInfoComponent(name, value, value_units, iconSrc) {
  return `<div class="advanced-info__item">
        <img class="advanced-info__img" src="${iconSrc}" />
        <p class="advanced-info__value">${value} ${value_units}</p>
        <p class="advanced-info__name">${name}</p>
    </div>`;
}

export default createAdvanceInfoComponent;
