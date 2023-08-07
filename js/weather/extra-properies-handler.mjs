"use strict";

function extraPropertiesHandler(setOfProperties, headers) {
  for (let property of setOfProperties) {
    property.addEventListener("change", () => {
      if (property.checked) {
        headers.push(property.value);
        console.log(headers);
      } else {
        headers.splice(headers.indexOf(property.value), 1);
        console.log(headers);
      }
    });
  }
}

export default extraPropertiesHandler;
