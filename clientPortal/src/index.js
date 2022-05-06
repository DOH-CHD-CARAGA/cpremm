import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root"),
);
registerServiceWorker();


// //Load HTTP module
// const http = require("http");
// const hostname = '127.0.0.1';
// const port = 4000;

// //Create HTTP server and listen on port 3000 for requests
// const server = http.createServer((req, res) => {

//   //Set the response HTTP header with HTTP status and Content type
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// //listen for request on port 3000, and as a callback function have the port listened on logged
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });





// const express = require('express');
// const http = require('http');

// const app = express();
// app.get('/', function (req, res) {
//   res.send('hi');
// });



// const server = http.createServer(app).listen(8080, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     const host = server.address().address;
//     const port = server.address().port;
//     console.log(`Server listening on ${host}:${port}`);
//   }
// });