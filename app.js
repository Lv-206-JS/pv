'use strict';

var express = require('express');
var app = express();
var helloAPI = require('./rest/hello');
var projectAPI = require('./rest/project');

// Enable CORS for unit tests
app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/rest/hello', helloAPI);
app.use('/rest/project', projectAPI);

app.use(/\/project.*/, express.static('./index.html'));
app.use(express.static(__dirname));

app.listen(9090);