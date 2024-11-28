"use strict";

/**
 * Import
 */
import { ripple } from "./utils/ripple.js";
import { AddEventOnElements } from "./utils/event.js";

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
segment($searchSegment, segmentValue => window.searchType = segmentValue)