"use strict";

const header = document.querySelector(".header");
const searchbarOpener = document.querySelector(".header__searchbar-opener");
const searchbarCloser = document.querySelector(".header__searchbar-closer");
const cityInterfaceName = document.querySelector("#city-name");

// Creating of searchbar
const searchbarInput = document.createElement("input");
searchbarInput.classList.add("header__searchbar-input");

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
}

function searchbarCloserAnimation() {
  // Disappearing input
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
}

searchbarOpener.addEventListener("click", searchbarOpenerAnimation);
searchbarCloser.addEventListener("click", searchbarCloserAnimation);
