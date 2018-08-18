'use strict'

function setColor(wagon, status) {
    var execFile = require('child_process').execFile
    // notice we're pointing this to the new executable
    var program = "build/Release/serverToArduino";
    // execFile will return immediately.
    var child = execFile(program, [],
      function (error, stdout, stderr) {
        // This function is still executed once the program terminates...
        var primes = stdout.split("\n").slice(0, -3)
                       .map(function (line) {
                           return parseInt(line);
                       });
    });

    // now we write "under" to stdin so the C++ program
    // can proceed (it's blocking for user input)
    child.stdin.setEncoding('utf-8');
    child.stdin.write(wagon+","+status + "\n");
    // Once the stdin is written, the C++ completes and
    // the callback above is invoked.
}

module.exports = setColor;
