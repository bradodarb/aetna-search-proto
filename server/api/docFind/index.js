'use strict';

var express = require('express');
var controller = require('./docFind.controller');

var router = express.Router();

router.get('/:query?', controller.index);

module.exports = router;