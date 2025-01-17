"use strict";

import { client } from "./api_configure.js";

/**
 * 
 * @param {Node} $element 
 * @param {String} type 
 * @param {Number} id 
 */
export const favorite = ($element, type, id) => {
    $element.addEventListener("click", () =>{
        $element.setAttribute("disabled", "");
        const /** {Object} */ favObject = JSON.parse(window.localStorage.getItem("favorite"));

        if(favObject[type][id]){
            $element.classList.toggle("active");
            $element.removeAttribute("disabled");
            delete favObject[type][id];
            window.localStorage.setItem("favorite", JSON.stringify(favObject));
        }else{
            client[type].detail(id, data =>{
                $element.classList.toggle("active");
                $element.removeAttribute("disabled");
                favObject[type][id] = data;
                window.localStorage.setItem("favorite", JSON.stringify(favObject));
            })
        }
    });
}