var express = require('express');
var app = express();
var server = require('http').createServer(app);

var fs = require('fs');
var path = require('path');
var mime = require('mime');

app.get("/", function(request, response) {
  response.writeHead(200, { "Content-Type" : "text/plain" });
  response.write("Hello world");
  response.end();
});

server.listen(process.env.PORT || 3000);
