var express = require('express');
var app = express();
var helloAPI = require('./src/routes/hello');

app.use('/rest/hello', helloAPI);
app.use(express.static(__dirname));

app.listen(9090);