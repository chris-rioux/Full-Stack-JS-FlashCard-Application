var mongoose = require('mongoose');
var request = require('request');
var Letter = mongoose.model('Letter');
var prefix = 'http://localhost:3000';

if (process.env.NODE_ENV === 'production') {
// Reference Heroku Config Variable
  prefix = 'https://rocky-earth-50963.herokuapp.com/';
}

module.exports.index = function(req, res) {
	Letter.find(function(err, letters) {
		if(err) {
			console.log(err);
		}
		res.json(letters);
	});
};

module.exports.letter = function(req, res) {
	Letter.findOne({ _id : req.params.id },
		function(err, letter) {
			if(err) {
				console.log(err);
			}
		res.json(letter);
	});
};

module.exports.check = function(req, res) {
	var userAnswers = req.body;
	
	request.get(prefix + '/api/letter/' + parseInt(req.body._id), function(error, response, body) {
		if(!error) {
			var jsonBody = JSON.parse(body);
			
			if (userAnswers.phonetics === jsonBody.details.phonetics && userAnswers.name === jsonBody.details.name && userAnswers.type === jsonBody.details.type) {
				res.json({correct : true});
			}
			else {
				res.json({correct : false});
			}
		}
		else {
			console.log(error);
		}
	});

};