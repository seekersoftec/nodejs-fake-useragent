const scrapUserAgentString = require("./lib/scraper/scraper");
const { genRandomStr } = require("./lib/tools");

process.env.cache = true;

scrapUserAgentString({
  enableCache: process.env.cache,
  cacheName: "page_links_cache",
  UserAgentStringUrl:
    "http://www.useragentstring.com/pages/useragentstring.php",
})
  .then((linkData) => {
    let browserList = ["chrome", "opera", "firefox", "edge"]; // default browser list
    let UAName = genRandomStr(browserList);
    //
    //
    if (UAName != "") {
      linkData.forEach((data) => {
        if (data.linkName.toLowerCase() == UAName.toLowerCase()) {
          //
          scrapUserAgentString({
            enableCache: process.env.cache,
            cacheName: UAName + "_UA_cache",
            UserAgentStringUrl: "http://www.useragentstring.com" + data.link,
          })
            .then((UAstrings) => {
              console.log(genRandomStr(UAstrings));
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    }
  })
  .catch((error) => {
    console.error(error);
  });
