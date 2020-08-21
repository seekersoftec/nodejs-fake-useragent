const fs = require("fs");
const cheerio = require("cheerio");
const axios = require("axios").default;
const { isEmpty } = require("lodash");

const fetchHtml = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(
      `ERROR: An error occurred while trying to fetch the URL: ${url}`
    );
  }
};

// extract pages links
const extractPageLinks = (selector) => {
  const linkName = selector.text().trim();
  const link = selector.attr("href").trim();

  return {
    linkName,
    link,
  };
};
//
const extractUserAgentString = (selector) => {
  return selector.text().trim();
};
//
//
const scrapUserAgentString = async (options) => {
  let cache = __dirname + "/cache/." + options.cacheName + ".json";
  //
  //
  function updateCache(pageLinks, cache) {
    if (fs.existsSync(cache)) {
      fs.unlinkSync(cache);
    }
    let data = JSON.stringify(pageLinks);
    // console.log("Writing Links to disk...");
    fs.writeFileSync(cache, data);
    // console.log("=> Written links to disk...");
  }
  //
  //

  if (fs.existsSync(cache)) {
    let pageLinks = JSON.parse(fs.readFileSync(cache));
    if (pageLinks != []) return pageLinks;
  }

  const html = await fetchHtml(options.UserAgentStringUrl);
  try {
    const $ = cheerio.load(html);

    //   a small extraction function
    function extract(pageResults, func) {
      return pageResults
        .map((id, element) => {
          const elementSelector = $(element);
          return func(elementSelector);
        })
        .get();
    }

    if (options.cacheName == "page_links_cache") {
      pageResults = $("#content").find(
        "#unterMenu > table > tbody > tr > td > a"
      );
      pageLinks = extract(pageResults, extractPageLinks);
    } else {
      pageResults = $("#content").find("#liste > ul > li > a");

      pageLinks = extract(pageResults, extractUserAgentString);
    }

    //
    // cache is enabled, save to disk
    if (
      options.enableCache == true &&
      (options.cacheName in options || !isEmpty(options.cacheName))
    ) {
      updateCache(pageLinks, cache);
    }

    return pageLinks;
  } catch (error) {
    onsole.error(`ERROR: An error occurred while trying to parse the URL`);
  }
};

//
//
//
//
module.exports = scrapUserAgentString;