"use strict";

import {ripple} from "./utils/ripple.js";
import {favorite} from "./favorite.js";
/**
 * 
 * @param {Object} photo 
 * @returns 
 */
export const photoCard = photo =>{
    const /**{String} */ root = window.location.origin;

    const {
        alt,
        avg_color : backdropColor,
        width,
        height,
        id,
        src : {large}
    } = photo;

    const /**{NodeElement} */ $card = document.createElement("div");
    $card.classList.add("card", "grid-item");
    $card.style.backgroundColor = backdropColor;
    const /**{Object} */ favoriteObject = JSON.parse(window.localStorage.getItem("favorite"));


    $card.innerHTML = `
        <figure class="card-banner" style="--width:${width}; --height:${height};">
            <img src="${large}" width="${width}" height="${height}" loading="lazy" class="img-cover" alt="${alt}">
        </figure>
        <div class="card-content">
            <button class="icon-btn small ${favoriteObject.photos[id] ? "active" : ""}" aria-label="Add to Favorite" data-ripple data-favorite-btn>
                <span class="material-symbols-outlined" aria-hidden="true">favorite</span>                    <div class="state-layer"></div>
            </button>
        </div>
        <a href="${root}/pages/photos/photo_detail.html?id=${id}" class="state-layer"></a>
    `;
    const /**{NodeElement} */ $cardBanner = $card.querySelector("img");
    $cardBanner.style.opacity = 0;
    $cardBanner.addEventListener("load", function(){
        this.animate({
            opacity : 1
        },{ duration : 400, fill: "forwards"});
    });

    const /**{NodeList} */ $rippleElem = [$card, ...$card.querySelectorAll("[data-ripple]")];
    $rippleElem.forEach($rippleElem => ripple($rippleElem));
    
    const /**{NodeElement} */ $favButton = $card.querySelector("[data-favorite-btn]");
    favorite($favButton, "photos", id);
    return $card;
}