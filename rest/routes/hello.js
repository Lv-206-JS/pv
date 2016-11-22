'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send({
        hello: 'hello',
        world: 'world',
        number: 3.1415,
        url: 'https://github.com/Lv-206-JS/pv'
    });
});

module.exports = router;