const fs = require("fs");
const { functions } = require("lodash");
const axios = require("axios").default;
//
// fetch url
async function fetchUrl(url) {
  try {
    let { data } = await axios.get(url);
    return data;
  } catch (error) {
    let errorString = `ERROR: An error occurred while trying to fetch the URL: ${url}`;
    console.error(errorString);
    return errorString;
  }
}

//
function saveCache(results, cache) {
  if (!fs.existsSync(cache)) {
    fs.writeFileSync(cache, JSON.stringify(results));
  }
}
//
function updateCache(results, cache) {
  if (fs.existsSync(cache)) {
    fs.unlinkSync(cache);
  }
  fs.writeFileSync(cache, JSON.stringify(results));
}
// Extraction functions
//
function extractPageResults(selector, pageResults, func) {
  return pageResults
    .map((id, element) => {
      const elementSelector = selector(element);
      return func(elementSelector);
    })
    .get();
}
// extract pages links
function extractPageLinks(selector) {
  let linkName = selector.text().trim();
  let link = selector.attr("href").trim();

  return {
    linkName,
    link,
  };
}
// extract user agent strings from the page links
function extractUserAgentString(selector) {
  return selector.text().trim();
}
//
function extractW3Schools() {
  //
}
// Randomization functions
//
function genRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//
function genRandomStr(Array) {
  return Array[Math.floor(Math.random() * Array.length)];
}

module.exports = {
  genRandomInt,
  genRandomStr,
  fetchUrl,
  saveCache,
  updateCache,
  extractPageResults,
  extractPageLinks,
  extractUserAgentString,
  extractW3Schools,
};
