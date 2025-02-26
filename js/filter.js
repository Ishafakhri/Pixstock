"use strict";
import { menu } from "./menu.js";

/**
 * @param {NodeElement} $filterWrapper
 * @param {Object} filterObj    
 * @param {Function} callback
 */
export const filter = ($filterWrapper, filterObj, callback) => {
    const /**{NodeElement} */ $filterClearBtn = $filterWrapper.querySelector("[data-filter-clear]");
    const /** {NodeElement} */ $filterValue = $filterWrapper.querySelector("[data-filter-value]");
    const /** {NodeElement} */ $filterChip = $filterWrapper.querySelector("[data-filter-chip]");
    const /** {NodeElement} */ $filterColorField = $filterWrapper.querySelector("[data-color-field]"); 
    const /**{String} */ filterKey = $filterWrapper.dataset.filter;

    const /**{Object} */ newObj = filterObj;
    menu($filterWrapper, filterValue =>{
        $filterValue.innerText = filterValue;
        $filterChip.classList.add("selected");

        newObj[filterKey] = filterValue;
        callback(newObj);
    });
    $filterClearBtn.addEventListener("click", () => {
        $filterChip.classList.remove("selected");
        $filterValue.innerText = $filterValue.dataset.filterValue;
        delete newObj[filterKey];
        callback(newObj);
    });
    $filterColorField?.addEventListener("change", function (){
        const /**{String} */ filterValue = this.value.toLowerCase();
        $filterValue.innerText = filterValue;
        $filterChip.classList.add("selected");
        newObj[filterKey] = filterValue;
        callback(newObj);
    }) 
}