var mongoose = require('mongoose');

var detailsSchema = new mongoose.Schema({
	type : String,
	name : String,
	phoenetic : String,
	image : String
});

var letterSchema = new mongoose.Schema({
  _id : Number,
  details : detailsSchema
});

mongoose.model('Letter', letterSchema, 'letters');