"use strict";

import {ripple} from "./utils/ripple.js";

export const photoCard = photo =>{
    const /**{String} */ root = window.location.origin;
    console.log(photo);

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

    $card.innerHTML = `
        <figure class="card-banner" style="--width:${width}; --height:${height};">
            <img src="${large}" width="${width}" height="${height}" loading="lazy" class="img-cover" alt="${alt}">
        </figure>
        <div class="card-content">
            <button class="icon-btn small active" aria-label="Add to Favorite" data-ripple data-toggle-btn>
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
    return $card;
}