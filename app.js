var jammers = require('./api/jammers');

var express = require('express');
var app = express();

app.configure(function () {
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());

});

app.get('/jammers', jammers.findAll);
app.post('/jammers', jammers.create);
app.get('/jammers/:id', jammers.findById);




app.listen(3000);



console.log('Listening on port 3000');




