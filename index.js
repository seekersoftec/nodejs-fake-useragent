const scrapUserAgentString = require("./lib/scraper");
const { getRandomStr } = require("./lib/tools");

scrapUserAgentString({
  enableCache: true,
  cacheName: "page_links_cache",
  UserAgentStringUrl:
    "http://www.useragentstring.com/pages/useragentstring.php",
})
  .then((linkData) => {
    let browserList = ["chrome", "opera", "firefox", "edge"]; // default browser list
    let UAName = getRandomStr(browserList);
    //
    //
    if (UAName != "") {
      linkData.forEach((data) => {
        if (data.linkName.toLowerCase() == UAName.toLowerCase()) {
          // console.log(data);
          //
          scrapUserAgentString({
            enableCache: true,
            cacheName: UAName + "_UA_cache",
            UserAgentStringUrl: "http://www.useragentstring.com" + data.link,
          })
            .then((UAstrings) => {
              console.log(getRandomStr(UAstrings));
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
