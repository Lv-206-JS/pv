'use strict';

var express = require('express');
var router = express.Router();

router.get('/:id', function (request, response) {
    var stub  = require('./project-stub.json');
    response.send(stub);
});

module.exports = router;