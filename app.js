var express = require('express');
var app = express();
var bp = require('body-parser');
var ejs = require('ejs');
var path = require('path');

app.use(bp.json());
app.use(bp.urlencoded({extended:true}));

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'ejs');

// Create a variable which stores the host and database name of your mongodb
var mongoose = require('mongoose');
var dbURL = 'mongodb://localhost:27017/alphabet';

// point mongoose at the models
require('./app_api/models/db.js');
var Letter = mongoose.model('Letter');

app.use('/', require('./app_server/routes/index.js'));
app.use('/api', require('./app_api/routes/index.js'));

app.listen(3000, function() {
	console.log("Application started on http://localhost:" + 3000 + "; press ctrl-c to terminate.");
});