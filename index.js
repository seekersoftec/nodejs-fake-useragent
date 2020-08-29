const { isEmpty, isArray } = require("lodash");
const UserAgentScraper = require("./lib/scraper/scraper");
const { genRandomStr } = require("./lib/tools");
// 
process.env.cache = true;
//
async function UserAgent(browserList = [
    "chrome",
    "edge",
    "firefox",
    "safari",
    "opera",
  ]) {
    //
    let selectedBrowsers = [];
    //
    let pageLinks = new UserAgentScraper({
      enableCache: process.env.cache,
      cacheName: "page_links_cache",
      onUpdate: false,
      userAgentStringUrl:
        "http://www.useragentstring.com/pages/useragentstring.php",
    });
    //
    let linksArr = await pageLinks.scraper();
    linksArr.forEach((data) => {
      if (browserList.includes(data.linkName.toLowerCase())) {
        selectedBrowsers.push(data);
      }
    });
    //
    //
    console.log(selectedBrowsers);
    let UAStrings = [];
    await selectedBrowsers.forEach(async (data) => {
      //
      let UAString = new UserAgentScraper({
        enableCache: process.env.cache,
        cacheName: data.linkName.toLowerCase() + "_UA_cache",
        onUpdate: false,
        UserAgentStringUrl: "http://www.useragentstring.com" + data.link,
      });
      //
      let UAStringData = await UAString.scraper();
      // return genRandomStr(UAStringData);
      UAStrings.push(genRandomStr(UAStringData));
    });
    //
    return UAStrings;
    // console.log(UAStrings);
  }


//
// 
//
let browserList = ["chrome", "opera"];
let ua = UserAgent(browserList);

console.log(ua);
