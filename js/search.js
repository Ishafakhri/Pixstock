"use strict";

/**
 * Import
 */
import { ripple } from "./utils/ripple.js";
import { AddEventOnElements } from "./utils/event.js";
import { segment } from "./segment_btn.js";
import { updateUrl } from "./utils/updateUrl.js";
import { urlDecode } from "./utils/urlDecode.js";

/**
 * Search view toggle in small devices
 */
const /** {NodeList} */ $searchTogglers = document.querySelectorAll("[data-search-toggler]");
const /**{NodeELement} */ $searchView = document.querySelector("[data-search-view]");

AddEventOnElements($searchTogglers, "click", () => $searchView.classList.toggle("show"));

/**
 * clearing search input functionality
 */
const /**{NodeElement} */ $searchField = document.querySelector("[data-search-field]");
const /**{NodeElement} */ $searchClearBtn = document.querySelector("[data-search-clear-btn]");

$searchClearBtn.addEventListener("click", () => $searchField.value = "");

/**
 * Search type
 */
const /**{NodeElement} */$searchSegment = document.querySelector("[data-segment='search']");
const /**{NodeElement} */ $activeSegmentBtn = $searchSegment.querySelector("[data-segment-btn].selected");

window.searchType = $activeSegmentBtn.dataset.segmentValue;

segment($searchSegment, segmentValue => window.searchType = segmentValue);

/**
 * Search submit
 */
if (!window.filterObj) {
    window.filterObj = {};
}
const /** {NodeElement} */ $searchBtn = document.querySelector("[data-search-btn]");

$searchBtn.addEventListener("click", function () {
  const /** {Boolean} */ searchValue = $searchField.value.trim();
  console.log(searchValue);
  if (searchValue) {
    updateSearchHistory(searchValue);
    window.filterObj.query = searchValue;
    updateUrl(window.filterObj, window.searchType);
  }
});

$searchField.addEventListener("keydown", e => {
  if (e.key === "Enter" && $searchField.value.trim()) {
    $searchBtn.click();
  }
});


/**
 * Update search history
 */
let /**{Object} */ searchHistory = {items : []};

if(window.localStorage.getItem("search_history")){
    searchHistory = JSON.parse(window.localStorage.getItem("search_history"));
} else{
    window.localStorage.setItem("search_history", JSON.stringify(searchHistory));
}

/**
 * if the searched value is already present in search list, then remove that one and add the search value at the beginning of the list
 * ensures that the latest search is always at the top
 */
const updateSearchHistory = searchValue => {
    if(searchHistory.items.includes(searchValue)){
        searchHistory.items.splice(searchHistory.items.indexOf(searchValue), 1);
    }
    searchHistory.items.unshift(searchValue);
    window.localStorage.setItem("search_history", JSON.stringify(searchHistory));
}

/**
 * Render search history items in search list
 */

const /** {NodeElement} */ $searchList = document.querySelector("[data-search-list]");
const /** {Number} */ historyLen = searchHistory.items.length;

for (let i = 0; i < historyLen & i <= 5; i++) {
  const /** {NodeElement} */ $listItem = document.createElement("button");
  $listItem.classList.add("list-item");

  $listItem.innerHTML = `
    <span class="material-symbols-outlined leading-icon" aria-hidden="true">history</span>

    <span class="body-large text">${searchHistory.items[i]}</span>

    <div class="state-layer"></div>
  `;

  ripple($listItem);

  $listItem.addEventListener("click", function () {
    $searchField.value = this.children[1].textContent;
    $searchBtn.click();
  });

  $searchList.appendChild($listItem);

}

const /** {Object} */ search = urlDecode(window.location.search.slice(1));
if(search.query) $searchField.value = search.query;