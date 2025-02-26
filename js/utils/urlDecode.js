"use strict";
/**
 * Decode URL parameters into an object
 * @param {String} urlString
 * @returns {Object}
 */
export const urlDecode = urlString => {
    return Object.fromEntries(urlString.replace(/%23/g, "#").replace(/%20/g, " ").split("&").map(i => i.split("=")));
  };