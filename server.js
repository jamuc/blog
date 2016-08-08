var express = require('express');
var app = express();
var server = require('http').createServer(app);

var fs = require('fs');
var path = require('path');
var mime = require('mime');

app.get("/", function(request, response) {
  streamFile(response, "./public/index.html");
});

app.get("/:filename", function(request, response) {
  streamFile(response, "./public/" + request.params.filename);
});

app.get("/stylesheets/:filename", function(request, response) {
  streamFile(response, "./public/stylesheets/" + request.params.filename);
});

function streamFile(response, filePath) {
  fs.exists(filePath, function(exist) {
    if(exist) {
      response.writeHead(200, { "Content-Type" : mime.lookup(path.basename(filePath)) });
      var stream  = fs.createReadStream(filePath);
      stream.pipe(response);
    } else {
      response.writeHead(404, { "Content-Type" : 'text/plain' });
      response.write("404: File not found");
      response.end();
    }
  });
}

server.listen(process.env.PORT || 3000);
