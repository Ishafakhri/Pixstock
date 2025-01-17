"use strict";

/**
 * Import
 */
import { client } from "./api_configure.js";
import { photoCard } from "./photo_card.js";

/**
 * render photos
 */
const /**{NodeElement} */ $photoGrid = document.querySelector("[data-photo-grid]")
$photoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(20);


client.photos.curated({page : 5, per_page : 20}, data => {
    $photoGrid.innerHTML = "";

    data.photos.forEach(photo => {
       const /**{NodeElement} */ $photoCard = photoCard(photo);

       $photoGrid.appendChild($photoCard);
    });
});