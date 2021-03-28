var http = require('http');
var express = require('express');
var shortid = require('shortid');
var app = express();

var server = http.createServer(app);
// Pass a http.Server instance to the listen method
const io = require('socket.io')(http);


// The server should start listening
server.listen(3008);

// Register the index route of your app that returns the HTML file

app.get('/v2/users/709189', function(req, res) {
  console.log("Request made")
  res.send('Hello World!')
});

// Expose the node_modules folder as static resources (to access socket.io.js in the browser)
app.use('/static', express.static('node_modules'));

// Handle connection
server.on('connection', function(socket) {
  socket.id = shortid.generate();
    //socket.setTimeout(500)
    socket.setKeepAlive(true);
    console.log("A new connection was made by a client." + ` SOCKET ${ socket.id }`);
    socket.on('end', function() { 
    console.log(`SOCKET ${ socket.id } END: other end of the socket sends a FIN packet`);
  });

  socket.on('timeout', function() { 
    console.log(`SOCKET ${ socket.id } TIMEOUT`);
  });

  socket.on('error', function(error) { 
    console.log(`SOCKET ${ socket.id } ERROR: ` + JSON.stringify(error));
  });

  socket.on('close', function(had_error) { 
    console.log(`SOCKET ${ socket.id } CLOSED. IT WAS ERROR: ` + had_error);
  });
});