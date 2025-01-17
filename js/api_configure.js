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
export const /**{Object} */ client = {
    photos:{
        /**
         * 
         * @param {Object} parameters 
         * @param {FUnction} callback 
         */
        search(parameters, callback){
            requestUrl = `${root.default}search?${urlEncode(parameters)}`;
            fetchData(requestUrl, callback);
        },
        /**
         * 
         * @param {Object} parameters 
         * @param {Function} callback 
         */
        curated(parameters, callback){
            fetchData(`${root.default}curated?${urlEncode(parameters)}`, callback);
        },
        /**
         * 
         * @param {String} id 
         * @param {Function} callback 
         */
        detail(id, callback){
            fetchData(`${root.default}photos/${id}`, callback);
        }
    },
    videos:{
        /**
         * 
         * @param {Object} parameters 
         * @param {FUnction} callback 
         */
        search(parameters, callback){
            requestUrl = `${root.videos}search?${urlEncode(parameters)}`;
            fetchData(requestUrl, callback);
        },
        /**
         * 
         * @param {Object} parameters 
         * @param {Function} callback 
         */
        curated(parameters, callback){
            fetchData(`${root.videos}popular?${urlEncode(parameters)}`, callback);
        },
        /**
         * 
         * @param {String} id 
         * @param {Function} callback 
         */
        detail(id, callback){
            fetchData(`${root.videos}videos/${id}`, callback);
        }
    },
    collections:{
        /**
         * 
         * @param {Object} parameters 
         * @param {FUnction} callback 
         */
        featured(parameters, callback){
            requestUrl = `${root.default}collections/featured?${urlEncode(parameters)}`;
            fetchData(requestUrl, callback);
        },
        /**
         * @param {Object} parameters
         * @param {String} id 
         * @param {Function} callback 
         */
        detail(id, parameters, callback){
            requestUrl = `${root.default}/collections/${id}?${urlEncode(parameters)}`;
            fetchData(requestUrl, callback);
        }
    }
}