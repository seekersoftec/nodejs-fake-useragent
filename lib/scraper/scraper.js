const fs = require("fs");
const cheerio = require("cheerio");
const { isEmpty } = require("lodash");
const {
  fetchUrl,
  updateCache,
  extractPageResults,
  extractPageLinks,
  extractUserAgentString,
} = require("../tools");

//
class UserAgentScraper {
  constructor(options) {
    this.options = options;
    this.cache = __dirname + "/cache/." + this.options.cacheName + ".json";
  }
  //
  scraper() {
    return new Promise(async (resolve, reject) => {
      //
      if (fs.existsSync(this.cache)) {
        this.pageLinks = JSON.parse(fs.readFileSync(this.cache));
        if (!isEmpty(this.pageLinks)) resolve(this.pageLinks);
      } else {
        //
        // cache is enabled, save/update the cached file.
        if (
          this.options.enableCache in this.options &&
          this.options.enableCache == true &&
          (this.options.cacheName in this.options ||
            !isEmpty(this.options.cacheName))
        ) {
          updateCache(this.pageLinks, this.cache);
        }
        //
        try {
          const html = await fetchUrl(
            this.options.userAgentStringUrl || this.options.UserAgentStringUrl
          );
          const $ = cheerio.load(html);

          if (this.options.cacheName.match("page_links_cache")) {
            this.pageResults = $("#content").find(
              "#unterMenu > table > tbody > tr > td > a"
            );
            this.pageLinks = extractPageResults(
              $,
              this.pageResults,
              extractPageLinks
            );
          } else if (this.options.cacheName.match("_UA_cache")) {
            this.pageResults = $("#content").find("#liste > ul > li > a");

            this.pageLinks = extractPageResults(
              $,
              this.pageResults,
              extractUserAgentString
            );
          } else {
          }
          //
          resolve(this.pageLinks);
        } catch (error) {
          let errorString = `ERROR: An error occurred while trying to load the Page: ${error}`;
          console.error(errorString);
          reject(errorString);
        }
      }
    });
  }
}

module.exports = UserAgentScraper;
