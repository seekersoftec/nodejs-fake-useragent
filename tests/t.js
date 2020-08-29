const UserAgent = require("../index");

//
async function doSomething() {
  let browserList = ["chrome", "opera"];
  let uas = await UserAgent(browserList);
  console.log(uas);
}

// OR

// async function doSomething() {
//   let uas = await UserAgent("safari");
//   console.log(uas);
// }

// OR

// async function doSomething() {
//   let uas = await UserAgent();
//   console.log(uas);
// }

doSomething()
