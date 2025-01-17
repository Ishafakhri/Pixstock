"use strict";
import {urlEncode} from "./utils/urlEncode.js";

const /** {String} */ API_KEY = "cw0oKXlq0nPSPRkBXvHCKOpXUMT163tCbDeIkDnvjGHzQ1a66F8hf8h4";

const /**{Function} */ headers = new Headers();
headers.append("Authorization", API_KEY);

const /**{Object} */ requestOptions = {headers};

/**
 * Fetch data from Pexels API
 * @param {string} url 
 * @param {Function} successCallback 
 */
const fetchData = async function(url, successCallback){
    const /**{Promises} */response = await fetch(url, requestOptions);

    if(response.ok){
        const /**{Object} */ data = await response.json();
        successCallback(data);
    }
}


let /**{String} */ requestUrl = "";
const /**{Object} */ root = {
    default: "https://api.pexels.com/v1/",
    videos : "https://api.pexels.com/videos/"
}
export const /** {Object} */ client = {

    photos: {
  
      /**
       * Search photos
       * @param {Object} parameters Url Object
       * @param {Function} callback Callback function
       */
      search(parameters, callback) {
        requestUrl = `${root.default}search?${urlEncode(parameters)}`;
        fetchData(requestUrl, callback);
      },
  
      /**
       * Curated photos
       * @param {Object} parameters Url Object
       * @param {Function} callback Callback function
       */
      curated(parameters, callback) {
        fetchData(`${root.default}curated?${urlEncode(parameters)}`, callback);
      },
  
      /**
       * Get single photo detail
       * @param {String} id Photo ID
       * @param {Function} callback Callback function
       */
      detail(id, callback) {
        fetchData(`${root.default}photos/${id}`, callback);
      }
  
    },
  
    videos: {
  
      /**
       * Search videos
       * @param {Object} parameters Url Object
       * @param {Function} callback Callback function
       */
      search(parameters, callback) {
        requestUrl = `${root.videos}search?${urlEncode(parameters)}`;
        fetchData(requestUrl, callback);
      },
  
      /**
       * Get Popular videos
       * @param {Object} parameters Url Object
       * @param {Function} callback Callback function
       */
      popular(parameters, callback) {
        fetchData(`${root.videos}popular?${urlEncode(parameters)}`, callback);
      },
  
      /**
       * Get single video detail
       * @param {String} id Video ID
       * @param {Function} callback Callback function
       */
      detail(id, callback) {
        fetchData(`${root.videos}videos/${id}`, callback);
      }
  
    },
  
    collections: {
  
      /**
       * Get featured collections
       * @param {Object} parameters Url Object
       * @param {Function} callback Callback function
       */
      featured(parameters, callback) {
        requestUrl = `${root.default}collections/featured?${urlEncode(parameters)}`;
        fetchData(requestUrl, callback);
      },
  
      /**
       * Get a collection medias
       * @param {String} id Collection ID
       * @param {Object} parameters Url object
       * @param {Function} callback Callback function
       */
      detail(id, parameters, callback) {
        requestUrl = `${root.default}/collections/${id}?${urlEncode(parameters)}`;
        fetchData(requestUrl, callback);
      }
  
    },
  
  }