'use strict'

var execFile = require('child_process').execFile
var program = "build/Release/serverToArduino";
// execFile will return immediately.
var child = execFile(program, [],
  function (error, stdout, stderr) {
    //executed when finished
});


function setColor(wagon, status) {
    child.stdin.setEncoding('utf-8');
    child.stdin.write(wagon+","+status + "\n");
}

module.exports = setColor;
