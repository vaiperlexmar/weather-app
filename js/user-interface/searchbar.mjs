"use strict";

const GEOCODE_URL = `https://geocode.maps.co/search?q=`;

const header = document.querySelector(".header");
const searchbarOpener = document.querySelector(".header__searchbar-opener");
const searchbarCloser = document.querySelector(".header__searchbar-closer");
const cityInterfaceName = document.querySelector("#city-name");

// Creating of searchbar
const searchbarInput = document.createElement("input");
searchbarInput.classList.add("header__searchbar-input");
// Suggestions container
const suggestionsContainer = document.createElement("div");
suggestionsContainer.classList.add("header__suggestions-container");

function searchbarOpenerAnimation() {
  searchbarOpener.removeEventListener("click", searchbarOpenerAnimation);
  searchbarOpener.classList.remove("slide-rotate-hor-top");

  // Disappearing of city name
  cityInterfaceName.classList.remove("slide-rotate-hor-top");
  cityInterfaceName.classList.add("slide-rotate-hor-bottom");
  setTimeout(() => (cityInterfaceName.style.display = "none"), 500);

  // Search button moves to right side
  searchbarOpener.classList.add("slide-rotate-hor-bottom");
  setTimeout(() => (searchbarOpener.style.gridColumn = "3"), 500);
  setTimeout(() => searchbarOpener.classList.add("slide-rotate-hor-top"), 600);

  // Close button appears
  setTimeout(() => searchbarCloser.classList.toggle("hidden"), 600);
  setTimeout(() => (searchbarCloser.style.gridRow = "1"), 600);
  searchbarCloser.classList.add("slide-rotate-hor-top");

  // Searchbar appears
  searchbarInput.classList.remove("slide-rotate-hor-bottom");
  setTimeout(() => searchbarInput.classList.add("scale-up-hor-center"), 600);
  setTimeout(() => header.appendChild(searchbarInput), 600);
  setTimeout(() => (searchbarInput.style.gridRow = "1"), 600);
  setTimeout(() => (searchbarInput.style.gridColumn = "2"), 600);
  setTimeout(
    () => searchbarInput.setAttribute("placeholder", "Type your city"),
    600
  );

  // Suggestions container add
  header.appendChild(suggestionsContainer);
}

function searchbarCloserAnimation() {
  // Disappearing input
  searchbarInput.classList.remove("scale-up-hor-center");
  searchbarInput.classList.add("slide-rotate-hor-bottom");
  setTimeout(() => (searchbarInput.value = ""), 600);
  setTimeout(() => header.removeChild(searchbarInput), 600);

  // Disappearing cross
  searchbarCloser.classList.remove("slide-rotate-hor-top");
  searchbarCloser.classList.add("slide-rotate-hor-bottom");
  setTimeout(() => searchbarCloser.classList.toggle("hidden"), 600);
  setTimeout(() => (searchbarCloser.style.gridRow = "3"), 600);

  // Search button moves to left side
  searchbarOpener.classList.add("slide-rotate-hor-bottom");
  searchbarOpener.classList.remove("slide-rotate-hor-top");
  setTimeout(() => (searchbarOpener.style.gridColumn = "1"), 500);
  setTimeout(() => searchbarOpener.classList.add("slide-rotate-hor-top"), 600);
  searchbarOpener.addEventListener("click", searchbarOpenerAnimation);

  // City Name Appear
  cityInterfaceName.classList.remove("slide-rotate-hor-bottom");
  cityInterfaceName.classList.add("slide-rotate-hor-top");
  setTimeout(() => (cityInterfaceName.style.display = "block"), 500);

  // Disappearing suggestions block
  suggestionsContainer.classList.add("slide-rotate-hor-bottom");
  setTimeout(() => (suggestionsContainer.innerHTML = ""), 500);
  suggestionsContainer.classList.remove("slide-rotate-hor-bottom");
  header.removeChild(suggestionsContainer);
}

searchbarOpener.addEventListener("click", searchbarOpenerAnimation);
searchbarCloser.addEventListener("click", searchbarCloserAnimation);

let searchTimeout;
let chosenCity;

async function searchBarInputHandler() {
  clearTimeout(searchTimeout);
  const query = searchbarInput.value;

  return new Promise((resolve, reject) => {
    searchTimeout = setTimeout(async () => {
      try {
        if (query.trim() === "") {
          suggestionsContainer.innerHTML = "";

          return;
        }
        const response = await fetch(`${GEOCODE_URL}${query}`);
        const data = await response.json();

        suggestionsContainer.innerHTML = "";
        data.forEach((suggestion) => {
          const suggestionItem = document.createElement("div");
          suggestionItem.classList.add("suggestion");

          // Make filling of suggestion
          const suggestionItemName = document.createElement("h3");
          const suggestionItemDiscription = document.createElement("p");
          suggestionItemName.classList.add("suggestion__name");
          suggestionItemDiscription.classList.add("suggestion__discription");

          const partsOfName = suggestion["display_name"].split(",");
          suggestionItemName.textContent = partsOfName[0].trim();
          suggestionItemDiscription.textContent = partsOfName
            .slice(1)
            .join(",")
            .trim();
          suggestionItem.appendChild(suggestionItemName);
          suggestionItem.appendChild(suggestionItemDiscription);
          suggestionsContainer.appendChild(suggestionItem);

          // Declare value of number this suggestion
          suggestionItem.setAttribute("data-value", data.indexOf(suggestion));

          // Add function, which give longitude and latitude
          suggestionItem.addEventListener("click", () => {
            const dataValue = suggestionItem.getAttribute("data-value");
            chosenCity = data[dataValue];
            const chosenCityLat = chosenCity["lat"];
            const chosenCityLon = chosenCity["lon"];
            const cityName = suggestionItemName.textContent;

            // Visual (close a searchbar)

            searchbarCloser.click();
            resolve([chosenCityLat, chosenCityLon, cityName]);
          });
        });
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        reject(error);
      }
    }, 500);
  });
}

export { searchBarInputHandler, searchbarInput };
