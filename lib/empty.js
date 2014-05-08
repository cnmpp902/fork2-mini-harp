var connect = require('connect');
var port = require('minimist')(process.argv.slice(2)).port;
// create a connect app
var app = connect();

// start the app as an http server on port 4000
console.log("Starting http server on http://localhost:"+port);
app.listen(port);
