var express = require('express');
var router = express.Router();

var letterCtrl = require('../controllers/letterCtrl');

router.get('/letter', letterCtrl.index);

router.get('/letter/:id', letterCtrl.letter);

router.post('/letter', letterCtrl.check);


module.exports = router;