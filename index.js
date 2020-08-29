const { isEmpty, isArray, startCase } = require("lodash");
const UserAgentScraper = require("./lib/scraper/scraper");
const { genRandomStr } = require("./lib/tools");
//
process.env.cache = true;
//
async function UserAgent(
  browserList = ["chrome", "edge", "firefox", "safari", "opera"]
) {
  //
  let selectedBrowsers = [];
  //
  let pageLinks = new UserAgentScraper({
    enableCache: process.env.cache,
    cacheName: "page_links_cache",
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
  // console.log(selectedBrowsers);
  let selectedBrowser = genRandomStr(selectedBrowsers);
  console.log(selectedBrowser);
  let UAString = new UserAgentScraper({
    enableCache: process.env.cache,
    cacheName: selectedBrowser.linkName.toLowerCase() + "_UA_cache",
    userAgentStringUrl: "http://www.useragentstring.com" + selectedBrowser.link,
  });
  let UAStringDataList = await UAString.scraper();
  return genRandomStr(UAStringDataList);
}

//
//
async function ua() {
  // let browserList = ["chrome", "opera"];
  let uas = await UserAgent("safari");

  console.log(uas);
  // return uas;
}

ua();

// module.exports = ua;
