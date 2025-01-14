"use strict";
/**
 * Import
 */
import { ripple } from "./utils/ripple.js";





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

window.filterObj = {};  