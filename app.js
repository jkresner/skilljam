var jammers = require('./api/jammers');

var express = require('express');
var app = express();



app.get('/', function(req, res){
  var body = 'Welcome to Skilljam';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});


app.get('/jammers', jammers.findAll);
app.get('/jammers/:id', jammers.findById);

app.listen(3000);



console.log('Listening on port 3000');