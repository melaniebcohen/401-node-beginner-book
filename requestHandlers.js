'use strict';

// exec executes a shell command from within node
// let exec = require('child_process').exec;
let querystring = require('querystring'), fs = require('fs'), formidable = require('formidable');

// wire request handlers into the router
function start(res, postData) {
  console.log('Request handler "start" was called.')
  // let content = 'empty';

  var body = `
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8">  
      </head>
      <body>
        <form action="/upload" enctype="multipart/form-data" method="post">
          <input type="file" name="upload" multiple="multiple">
          <input type="submit" value="Upload file">
        </form>
      </body>
    </html
  `
  res.writeHead(200, { 'Content-type': 'text/html' })
  res.write(body);
  res.end();

  // exec('find /',
  //   { timeout: 1000, maxBuffer: 20000*1024 },
  //   function(error, stdout, stderr) {
  //     res.writeHead(200, { 'Content-type': 'text/plain' })
  //     res.write(stdout);
  //     res.end();
  //   }
  // )
  // exec('ls -lah', function(error, stdout, stderr) {
  //   content = stdout;
  //   res.writeHead(200, { 'Content-type': 'text/plain' })
  //   res.write(stdout);
  //   res.end();
  // })

  // return content;

  // // node waits 10 seconds and returns hello start
  // function sleep(milliseconds) {
  //   let startTime = new Date().getTime();
  //   while (new Date().getTime() < (startTime + milliseconds));
  // }

  // sleep(1000);
  // return 'Hello Start';
}

function upload(res, req) {
  console.log('Request handler "upload" was called.')

  let form = new formidable.IncomingForm();
  console.log('about to parse')
  form.parse(req, function(error, fields, files) {
    console.log('parsing done')

    fs.rename(files.upload.path, '/tmp/test.png', function(error) {
      if (error) {
        fs.unlink('/tmp/test.png');
        fs.rename(files.upload.path, '/tmp.test.png');
      }
    })
    res.writeHead(200, { 'Content-type': 'text/plain' })
    // res.write(`You've sent the text: ${querystring.parse(postData).text}`);
    res.write(`received image:`)
    res.write(`<img src="/show">`)
    res.end();
  })
}

function show(res) {
  console.log('Request handler "show" was called.');
  res.writeHead(200, { 'Content-type' : 'image/png' })
  fs.createReadStream('/tmp/test.png').pipe(res);
}

exports.start = start;
exports.upload = upload;
exports.show = show;