'use strict';

// // requires the http module that ships with node.js
// let http = require('http');

// // pass the createServer function an anonymous function
// http.createServer(function(req,res) {
//   res.writeHead(200, {'Content-type': 'text/plain'});
//   res.write('Hello world');
//   res.end();
// }).listen(8888);

/* could also write it as:
let http = require('http');

let server = http.createServer();
server.listen(8888);
*/

/* could also write it as:
let http = require('http);

function onRequest(req, res) {
  res.writeHead(200, { 'Content-type': 'text/plain' });
  res.write('Hello world');
  res.end();
}

http.createServer(onRequest).listen(8888)
*/
function say(word) {
  console.log(word);
}

function execute(someFunction, value) {
  someFunction(value);
}

// we are passing the function say as the first parameter - not the return value, but the function itself
execute(say, 'Hello')

// here we define the function we want to pass to execute right there as the first parameter - this is an anonymous function
execute(function(word) { console.log(word) }, 'Hello');

// Why are we doing it like this (lines 4-11)? 
// The following is SYNCHRONOUS
// var result = database.query('SELECT * FROM hugetable');
// console.log('Hello world');

// rewritten with a second parameter - an anonymous function - so it is ASYNCHRONOUS
// database.query('SELECT * FROM hugetable', function(rows) {
//   var result = rows;
// });
// console.log('Hello World');

let http = require('http');
let url = require('url');

function start(route, handle) {
  function onRequest(req,res) {
    // let postData = '';
    let pathname = url.parse(req.url).pathname;
    console.log(`Request for ${pathname} received.`);
    route(handle, pathname, res, req);
  }
  // req.setEncoding('utf8');

  // put the data and end event callbacks in the server, collecting all POST data chunks in the data callback
  // req.addListener('data', function(postDataChunk) {
  //   postData += postDataChunk;
  //   console.log(`Received POST data chunk ${postDataChunk}.`)
  // })

  // req.addListener('end', function() {
  //   route(handle, pathname, res, postData);
  // })

  // res.writeHead(200, { 'Content-type': 'text/plain' })
  // let content = route(handle, pathname);
  // res.write(content);
  // res.end();
  // }

  http.createServer(onRequest).listen(8888);
  console.log('Server has started');
}

exports.start = start;