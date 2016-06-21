var express = require('express');
var router = express.Router();

var appCtrl = require('../controllers/appCtrl');

router.get('/', appCtrl.index);

module.exports = router;