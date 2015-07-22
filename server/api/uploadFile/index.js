'use strict';

var express = require('express');
var controller = require('./uploadFile.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.delete('/', controller.destroy);

module.exports = router;
