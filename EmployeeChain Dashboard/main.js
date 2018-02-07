var express = require('express');
var app = express();
app.use(express.static('public'));


app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
app.get('/ustglobal', function (req, res) {
   res.sendFile( __dirname + "/" + "ustglobal.html" );
})
app.get('/infosys', function (req, res) {
   res.sendFile( __dirname + "/" + "infosys.html" );
})
app.get('/tcs', function (req, res) {
   res.sendFile( __dirname + "/" + "tcs.html" );
})
app.get('/alliance', function (req, res) {
   res.sendFile( __dirname + "/" + "alliance.html" );
})


var server = app.listen(7075, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})