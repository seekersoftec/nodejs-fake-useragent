<h2><b>nodejs-fake-useragent</b></h2>
<br/>
<br/>
<p>
A port of python's <a href="https://github.com/hellysmile/fake-useragent">fake-user-agent library</a>

- Grabs up to date useragent from <a href="useragentstring.com">useragentstring</a>

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

<br/>
<br/>
- Unit testing
- Get the most used browser(s) from <a href="https://www.w3schools.com/browsers/default.asp">w3schools</a> 