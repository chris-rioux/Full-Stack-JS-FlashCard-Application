var apiURI = 'http://localhost:3000';

// if (process.env.NODE_ENV == 'production') {
// 	apiURI = 'https:// YOU NEED TO PUT THIS IN AFTER "HEROKU CREATE" .herokuapp.com';
// }

module.exports.index = function(req, res) {
	res.render('index.ejs');
};