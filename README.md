<h2><b>nodejs-fake-useragent</b></h2>
<br/>
<br/>
<p>
A port of python's fake-user-agent library

- grabs up to date useragent from useragentstring.com

get the most used browser(s) from w3schools: https://www.w3schools.com/browsers/default.asp

</p>

<br/>
<br/>
<h4><b>how to use:</b></h4>

<p>
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

</p>
