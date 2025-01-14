"use strict";

/**
 * Import
 */
import { AddEventOnElements } from "./utils/event.js";

/**
 * 
 */

export const segment = function($segment, callback){
    const /**{NodeElement} */ $segmentBtns = $segment.querySelectorAll("[data-segment-btn]");

    let /**{NodeElement} */ $lastSelectedSegmentBtn = $segment.querySelector("[data-segment-btn].selected");

    AddEventOnElements($segmentBtns, "click", function(){
        $lastSelectedSegmentBtn.classList.remove("selected");
        this.classList.add("selected");
        $lastSelectedSegmentBtn = this;
        callback(this.dataset.segmentValue);
    });
}