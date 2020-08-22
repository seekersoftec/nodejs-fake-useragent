//
function genRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  //
  function genRandomStr(Array) {
    return Array[Math.floor(Math.random() * Array.length)];
  }


module.exports = {
    genRandomInt,
    genRandomStr
}