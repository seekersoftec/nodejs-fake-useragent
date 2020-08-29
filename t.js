const UserAgent = require("./index");

//
//
async function doSomething() {
  // let browserList = ["chrome", "opera"];
  let uas = await UserAgent("safari");
    console.log(uas);
//   return uas;
}

doSomething()
