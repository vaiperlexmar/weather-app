"use strict";

const header = document.querySelector(".header");
const searchbarOpener = document.querySelector(".header__searchbar-opener");
const searchbarCloser = document.querySelector(".header__searchbar-closer");
const cityInterfaceName = document.querySelector("#city-name");

function searchbarOpenerAnimation() {
  // Disappearing of city name
  cityInterfaceName.classList.add("slide-rotate-hor-bottom");
  setTimeout(() => (cityInterfaceName.style.display = "none"), 500);

  // Search button moves to right side
  searchbarOpener.classList.add("right-side-animation");
  setTimeout(() => (searchbarOpener.style.marginRight = "5vw"), 600);
  setTimeout(() => (searchbarOpener.style.gridColumn = "3"), 600);

  // Close button appears
  searchbarCloser.classList.toggle("hidden");
}

searchbarOpener.addEventListener("click", searchbarOpenerAnimation);
