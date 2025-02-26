"use strict";
import {client} from "../../js/api_configure.js";
import {gridInit, updateGrid} from "../../js/utils/masonry_grid.js";
import {photoCard} from "../../js/photo_card.js";
import {updateUrl} from "../../js/utils/updateUrl.js";
import {urlDecode} from "../../js/utils/urlDecode.js";

const /**{NodeElement} */ $filterBar = document.querySelector("[data-filter-bar]");
$filterBar.computedStyleMap.display = window.location.search ? "flex" : "none"; 

const /**{NodeElement} */ $photoGrid = document.querySelector("[data-photo-grid]");
const /**{NodeElement} */ $title = document.querySelector("[data-title]");
const /**{NodeElement} */ photoGrid = gridInit($photoGrid);
const /**{Number} */ perPage = 30;
let /** {Number} */ currentPage = 1;
let /** {Number} */ totalPage = 0;
const /** {String} */ searchUrl = window.location.search.slice(1);
let /**{Object} */ searchObject = searchUrl && urlDecode(searchUrl);
const /**{String} */ title = searchObject ? `${searchObject.query} photos` : "Curated Photos"
$title.textContent = title;
document.title = title;

/**
 * 
 * @param {Number} currentPage 
 */
const renderPhotos = function (currentPage){
    client.photos[searchObject ? "search" : "curated"]({... searchObject, per_page: perPage, page: currentPage}, data=>{
        totalPage = Math.ceil(data.total_results / perPage); 
        data.photos.forEach(photo =>{
            const /**{NodeElement} */ $photoCard = photoCard(photo);
            updateGrid($photoCard, photoGrid.columnsHeight, photoGrid.$columns);
        })
        isLoaded = true;
        if(currentPage >= totalPage){
            $loader.style.display = "none";
        }
    })
}
renderPhotos(currentPage);

const /**{NodeElement} */ $loader = document.querySelector("[data-loader]");
let /**{Boolean} */ isLoaded = true;
window.addEventListener("scroll", function(){
    console.log($loader.getBoundingClientRect().top);
    if($loader.getBoundingClientRect().top < window.innerHeight && isLoaded){
        isLoaded = false;
        if(currentPage < totalPage){
            currentPage++;
            renderPhotos(currentPage);
            isLoaded = true;
        }
    }
});