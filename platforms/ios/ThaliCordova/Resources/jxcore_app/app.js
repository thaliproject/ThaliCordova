var fs = require('fs');
var path = require('path');

var foo = cordova('log');
foo.call("JXcore is up and running!!!!");
foo.call("!!!!!!!!!!!!!!!!!!!");

cordova('brian').registerSync(function() {
                              console.log("Hello!!!");
                              
                              var count = 1;
                              var that = this;
                              setInterval(function() {
                                          console.log("New Callback!!! " + count);
                                          console.log(that.process.versions.node);
                                          
                                          count++;
                                          }, 1000);
                              
                              
                              });

cordova('getBuffer').registerSync(function() {
                                  var buffer = new Buffer(25000);
                                  buffer.fill(45);
                                  
                                  // send back a buffer
                                  return buffer;
                                  });

cordova('asyncPing').registerAsync(function(message, callback){
                                   setTimeout(function() {
                                              callback("Pong:" + message);
                                              }, 0);
                                   });

// requiring a node module
var jsnice = require('json-nice');

//using it
var obj = { a:1, b:2 };
console.log(jsnice(obj));

// execpath
console.log("The exec execPath", process.execPath);

// cwd
console.log("process.cwd", process.cwd());

// iOS user directory
console.log("userPath", fs.readdirSync(process.userPath));

var os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

function http_server(addresses){
    var http = require('http');
    http.createServer(function (req, res) {
                      res.writeHead(200, {'Content-Type': 'text/plain'});
                      res.end('Brian!!! Hello World ' + process.threadId + '\n');
                      }).listen(1337, addresses[0]);
    console.log('Server running at http://'+addresses[0]+':1337/');
}

jxcore.tasks.addTask(http_server, addresses);



