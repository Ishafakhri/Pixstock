"use strict";
import { AddEventOnElements } from "./utils/event.js";

/**
 * Add menu functionality
 * @param {Node} $menuWrapper Menu parent node
 * @param {function} callback Callback function
 */
export const menu = function($menuWrapper, callback) {
    const /**{NodeElement} */ $menu = $menuWrapper.querySelector("[data-menu]");   
    const /**{NodeList} */ $menuTogglers = $menuWrapper.querySelectorAll("[data-menu-toggler]");
    const /**{NodeList} */ $menuItems = $menuWrapper.querySelectorAll("[data-menu-item]"); 

    AddEventOnElements($menuTogglers, "click", () => {
        $menu.classList.toggle("expanded");
    });
    AddEventOnElements($menuItems, "click", function() {
        $menu.classList.remove("expanded");
       
        if(callback) callback(this.dataset.menuItem);
    });
};