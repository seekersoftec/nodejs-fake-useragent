const fs = require("fs");
const cheerio = require("cheerio");
const axios = require("axios").default;
const { isEmpty } = require("lodash");
//
//
function updateCache(pageLinks, cache) {
  if (fs.existsSync(cache)) {
    fs.unlinkSync(cache);
  }
  let data = JSON.stringify(pageLinks);
  fs.writeFileSync(cache, data);
}
//   a small extraction function
function extract(pageResults, func) {
  return pageResults
    .map((id, element) => {
      const elementSelector = $(element);
      return func(elementSelector);
    })
    .get();
}
// extract pages links
function extractPageLinks(selector) {
  const linkName = selector.text().trim();
  const link = selector.attr("href").trim();

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
const extractW3Schools = () => {
  //
};
//
// fetch url
async function fetchUrl(url) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(
      `ERROR: An error occurred while trying to fetch the URL: ${url}`
    );
  }
}
//
async function UserAgentScraper(options) {
  //
  let cache = __dirname + "/cache/." + options.cacheName + ".json";
  //
  if (fs.existsSync(cache)) {
    let pageLinks = JSON.parse(fs.readFileSync(cache));
    if (!isEmpty(pageLinks)) return pageLinks;
  }
  //
  // cache is enabled, save to disk
  if (
    options.enableCache == true &&
    (options.cacheName in options || !isEmpty(options.cacheName))
  ) {
    updateCache(pageLinks, cache);
  }

  try {
    const html = await fetchUrl(options.UserAgentStringUrl);
    const $ = cheerio.load(html);

    let cacheName = options.cacheName;
    if (cacheName.match("page_links_cache")) {
      pageResults = $("#content").find(
        "#unterMenu > table > tbody > tr > td > a"
      );
      pageLinks = extract(pageResults, extractPageLinks);
    } else if (cacheName.match("_UA_cache")) {
      pageResults = $("#content").find("#liste > ul > li > a");

      pageLinks = extract(pageResults, extractUserAgentString);
    } else {
    }
    //

    return pageLinks;
  } catch (error) {
    console.error(`ERROR: An error occurred while trying to load the Page`);
  }
}
//
module.exports = UserAgentScraper;