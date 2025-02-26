"use strict";
/**
 * Import
 */
import { ripple } from "./utils/ripple.js";
import { AddEventOnElements } from "./utils/event.js";
import { urlDecode } from "./utils/urlDecode.js";




/**
 * Header on-scroll state
 */
document.addEventListener("DOMContentLoaded", () => {
  const $header = document.querySelector("[data-header]");

  if ($header) {
    window.addEventListener("scroll", () => {
      $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
    });
  } else {
    console.error("Element with [data-header] not found.");
  }
});

/**
 * Add ripple effect to elements
 */
const /** {NodeElement} */ $rippleElems = document.querySelectorAll("[data-ripple]");

$rippleElems.forEach($rippleElem => ripple($rippleElem));

/**
 * navbar toggler
 */
const /** {NodeList} */ $navTogglers = document.querySelectorAll("[data-nav-toggler]");
const /** {NodeElement} */ $navbar = document.querySelector("[data-navigation]");
const /** {NodeElement} */ $scrim = document.querySelector("[data-scrim]");
AddEventOnElements($navTogglers, "click", function () {
  $navbar.classList.toggle("show");
  $scrim.classList.toggle("active");
});


window.filterObj = {};  

/**
 * Show filter option
 */
if(window.location.search.slice(1)){
  const /** {NodeElement} */ search = urlDecode(window.location.search.slice(1));
  Object.entries(search).forEach(item =>{
    const /**{String} */ filterKey = item[0];
    const /**{String} */ filterValue = item[1];
    window.filterObj[filterKey] = filterValue;

    if(filterKey === "query"){
      const /**NodeElement */ $filterItem = document.querySelector(`[data-filter="${filterKey}"]`);
      $filterItem?.querySelector("[data-filter-chip]").classList.add("selected") 
      if($filterItem) $filterItem.querySelector("[data-filter-value]").innerText = filterValue;
    }
  })
}



/**
 * Initialize fav object to local storage
 */
if(!window.localStorage.getItem("favorite")){
  const /**{Object} */ favObject = {
    photos : {},
    videos : {}
  }
  window.localStorage.setItem("favorite", JSON.stringify(favObject));   
}

/**
 * Page Transition
 */
window.addEventListener("loadstart", function(){
  document.body.style.opacity = "0";
})
window.addEventListener("DOMContentLoaded", function(){
  document.body.style.opacity = "1";
})