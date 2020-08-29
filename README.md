a port of python's fake-user-agent library


get the most used browser(s) from w3schools: https://www.w3schools.com/browsers/default.asp

how to use:

const UserAgent =  require("./index");
async function doSomething() {
  let uas = await UserAgent("safari");
  console.log(uas);
}
async function doSomething() {
  let browserList = ["chrome", "opera"];
  let uas = await UserAgent(browserList);
  console.log(uas);
}
async function doSomething() {
  let uas = await UserAgent();
  console.log(uas);
}