<b>nodejs-fake-useragent</b>
a port of python's fake-user-agent library

- grabs up to date useragent from useragentstring.com

get the most used browser(s) from w3schools: https://www.w3schools.com/browsers/default.asp

<br/>
<br/>
<b>how to use:</b>

const UserAgent = require("./index");

async function doSomething() {
let uas = await UserAgent("safari");
console.log(uas);
}

OR

async function doSomething() {
let browserList = ["chrome", "opera"];
let uas = await UserAgent(browserList);
console.log(uas);
}

OR

async function doSomething() {
let uas = await UserAgent();
console.log(uas);
}
