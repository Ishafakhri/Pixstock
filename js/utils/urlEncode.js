"use strict";
/**
 * 
 * @param {Object} urlObj 
 * @returns 
 */
export const urlEncode = urlObj => {
    return Object.entries(urlObj).join("&").replace(/,/g, "=").replace(/#/g, "%23");
}